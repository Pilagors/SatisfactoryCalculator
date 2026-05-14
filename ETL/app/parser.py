import json
import logging

log = logging.getLogger("etl")


def load_data(filepath: str) -> list:
    log.info(f"Lecture du fichier : {filepath}")
    with open(filepath, encoding="utf-16") as f:
        data = json.load(f)
    log.info(f"JSON parsé avec succès ({len(data)} entrées)")
    return data
