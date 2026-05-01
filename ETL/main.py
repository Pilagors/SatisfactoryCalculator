from app.parser import load_data
from app.transform import transform
from app.load import load_to_db

data = load_data("Docs.json")
clean = transform(data)
load_to_db(clean)