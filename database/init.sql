CREATE TABLE items (
    id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE recipes (
    id TEXT PRIMARY KEY,
    duration FLOAT
);

CREATE TABLE recipe_inputs (
    recipe_id TEXT REFERENCES recipes(id),
    item_id TEXT REFERENCES items(id),
    amount FLOAT
);

CREATE TABLE recipe_outputs (
    recipe_id TEXT REFERENCES recipes(id),
    item_id TEXT REFERENCES items(id),
    amount FLOAT
);