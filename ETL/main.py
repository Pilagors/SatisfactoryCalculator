from app.logger import setup_logging
from app.parser import load_data
from app.transform import transform
from app.load import load_to_db

log = setup_logging()

log.info("=== ETL Satisfactory - démarrage ===")

log.info("Chargement du fichier JSON...")
data = load_data("data/en-US.json")
log.info(f"Fichier chargé : {len(data)} sections NativeClass trouvées")

log.info("Transformation des données...")
clean = transform(data)
log.info(
    f"Transformation terminée : {len(clean['items'])} items, "
    f"{len(clean['recipes'])} recettes"
)

log.info("Chargement en base de données...")
load_to_db(clean)

log.info("=== ETL terminé avec succès ===")
