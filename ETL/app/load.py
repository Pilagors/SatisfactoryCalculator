import os
import time
import logging
import psycopg2
from psycopg2.extras import execute_batch

log = logging.getLogger("etl")


def _get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        dbname=os.getenv("DB_NAME", "sc-db"),
        user=os.getenv("DB_USER", "user"),
        password=os.getenv("DB_PASSWORD", "password"),
    )


def _wait_for_schema(retries: int = 20, delay: int = 5) -> psycopg2.extensions.connection:
    log.info(f"Attente du schéma DB (max {retries * delay}s)...")
    for attempt in range(1, retries + 1):
        try:
            conn = _get_conn()
            with conn.cursor() as cur:
                cur.execute("SELECT 1 FROM recipes LIMIT 1")
            log.info("Connexion DB établie, schéma prêt")
            return conn
        except Exception as e:
            log.warning(f"Tentative {attempt}/{retries} — DB pas encore prête : {e}")
            time.sleep(delay)
    raise RuntimeError("Impossible de se connecter à la DB après plusieurs tentatives.")


def load_to_db(data: dict) -> None:
    conn = _wait_for_schema()
    try:
        with conn:
            with conn.cursor() as cur:
                log.info(f"Insertion de {len(data['items'])} items...")
                _load_items(cur, data["items"])
                log.info(f"Insertion de {len(data['recipes'])} recettes...")
                _load_recipes(cur, data["recipes"])
        log.info(
            f"Chargement terminé : {len(data['items'])} items, "
            f"{len(data['recipes'])} recettes insérées"
        )
    except Exception:
        log.exception("Erreur lors du chargement en DB")
        raise
    finally:
        conn.close()


def _load_items(cur, items: list) -> None:
    execute_batch(
        cur,
        """
        INSERT INTO items (id, name, description, form, stack_size, sink_points, is_resource, energy_value)
        VALUES (%(id)s, %(name)s, %(description)s, %(form)s, %(stack_size)s, %(sink_points)s, %(is_resource)s, %(energy_value)s)
        ON CONFLICT (id) DO UPDATE SET
            name         = EXCLUDED.name,
            description  = EXCLUDED.description,
            form         = EXCLUDED.form,
            stack_size   = EXCLUDED.stack_size,
            sink_points  = EXCLUDED.sink_points,
            is_resource  = EXCLUDED.is_resource,
            energy_value = EXCLUDED.energy_value
        """,
        items,
    )
    log.info(f"  → {len(items)} items insérés/mis à jour")


def _load_recipes(cur, recipes: list) -> None:
    recipe_rows = [
        {"id": r["id"], "name": r["name"], "duration": r["duration"], "is_alternate": r["is_alternate"]}
        for r in recipes
    ]
    execute_batch(
        cur,
        """
        INSERT INTO recipes (id, name, duration, is_alternate)
        VALUES (%(id)s, %(name)s, %(duration)s, %(is_alternate)s)
        ON CONFLICT (id) DO UPDATE SET
            name         = EXCLUDED.name,
            duration     = EXCLUDED.duration,
            is_alternate = EXCLUDED.is_alternate
        """,
        recipe_rows,
    )
    log.info(f"  → {len(recipe_rows)} recettes insérées/mises à jour")

    total_ingredients = 0
    total_products = 0

    for recipe in recipes:
        if recipe["ingredients"]:
            execute_batch(
                cur,
                """
                INSERT INTO recipe_ingredients (recipe_id, item_id, amount)
                VALUES (%(recipe_id)s, %(item_id)s, %(amount)s)
                """,
                [{"recipe_id": recipe["id"], **i} for i in recipe["ingredients"]],
            )
            total_ingredients += len(recipe["ingredients"])

        if recipe["products"]:
            execute_batch(
                cur,
                """
                INSERT INTO recipe_products (recipe_id, item_id, amount)
                VALUES (%(recipe_id)s, %(item_id)s, %(amount)s)
                """,
                [{"recipe_id": recipe["id"], **p} for p in recipe["products"]],
            )
            total_products += len(recipe["products"])

    log.info(f"  → {total_ingredients} ingrédients, {total_products} produits insérés")
