import json


def load_data(filepath: str) -> list:
    with open(filepath, encoding="utf-16") as f:
        return json.load(f)
