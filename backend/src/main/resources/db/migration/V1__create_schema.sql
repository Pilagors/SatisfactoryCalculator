CREATE TABLE items (
    id          TEXT PRIMARY KEY,
    name        TEXT    NOT NULL,
    description TEXT,
    form        TEXT    NOT NULL DEFAULT 'RF_SOLID',
    stack_size  TEXT,
    sink_points INTEGER          DEFAULT 0,
    is_resource BOOLEAN          DEFAULT FALSE,
    energy_value FLOAT           DEFAULT 0
);

CREATE TABLE recipes (
    id           TEXT PRIMARY KEY,
    name         TEXT    NOT NULL,
    duration     FLOAT   NOT NULL,
    is_alternate BOOLEAN DEFAULT FALSE
);

CREATE TABLE recipe_ingredients (
    id        SERIAL PRIMARY KEY,
    recipe_id TEXT   NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    item_id   TEXT   NOT NULL REFERENCES items(id),
    amount    FLOAT  NOT NULL
);

CREATE TABLE recipe_products (
    id        SERIAL PRIMARY KEY,
    recipe_id TEXT   NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    item_id   TEXT   NOT NULL REFERENCES items(id),
    amount    FLOAT  NOT NULL
);
