import re
import logging

log = logging.getLogger("etl")

ITEM_NATIVE_CLASSES = [
    "FGItemDescriptor'",
    "FGResourceDescriptor'",
    "FGEquipmentDescriptor'",
    "FGItemDescriptorBiomass'",
    "FGAmmoTypeProjectile'",
    "FGAmmoTypeSpreadshot'",
    "FGAmmoTypeInstantHit'",
    "FGPowerShardDescriptor'",
    "FGItemDescriptorNuclearFuel'",
    "FGVehicleDescriptor'",
    "FGConsumableDescriptor'",
    "FGItemDescriptorPowerBoosterFuel'",
    "FGBuildingDescriptor'",
]

_INGREDIENT_RE = re.compile(
    r"ItemClass=\"[^\"]*'[^.]+\.([^']+)'\".*?Amount=(\d+(?:\.\d+)?)"
)


def _parse_ingredient_list(raw: str) -> list[dict]:
    return [
        {"item_id": m.group(1), "amount": float(m.group(2))}
        for m in _INGREDIENT_RE.finditer(raw)
    ]


def _is_production_recipe(produced_in: str) -> bool:
    if not produced_in or produced_in.strip() in ("()", ""):
        return False
    producers = re.findall(r'"([^"]+)"', produced_in)
    return any("BuildGun" not in p for p in producers)


def transform(data: list) -> dict:
    items: list[dict] = []
    recipes: list[dict] = []
    skipped_recipes = 0

    for entry in data:
        native = entry.get("NativeClass", "")
        is_resource = "FGResourceDescriptor'" in native

        if any(cls in native for cls in ITEM_NATIVE_CLASSES):
            for cls in entry.get("Classes", []):
                items.append({
                    "id": cls["ClassName"],
                    "name": cls.get("mDisplayName", cls["ClassName"]),
                    "description": cls.get("mDescription", ""),
                    "form": cls.get("mForm", "RF_SOLID"),
                    "stack_size": cls.get("mStackSize", ""),
                    "sink_points": int(cls.get("mResourceSinkPoints") or 0),
                    "is_resource": is_resource,
                    "energy_value": float(cls.get("mEnergyValue") or 0),
                })

    known_item_ids = {item["id"] for item in items}
    log.info(f"Items extraits : {len(items)} ({sum(1 for i in items if i['is_resource'])} ressources brutes)")

    for entry in data:
        native = entry.get("NativeClass", "")
        if "FGRecipe'" not in native:
            continue

        for cls in entry.get("Classes", []):
            if not _is_production_recipe(cls.get("mProducedIn", "")):
                skipped_recipes += 1
                continue

            ingredients = [
                i for i in _parse_ingredient_list(cls.get("mIngredients", ""))
                if i["item_id"] in known_item_ids
            ]
            products = [
                p for p in _parse_ingredient_list(cls.get("mProduct", ""))
                if p["item_id"] in known_item_ids
            ]

            if not ingredients and not products:
                skipped_recipes += 1
                continue

            recipes.append({
                "id": cls["ClassName"],
                "name": cls.get("mDisplayName", cls["ClassName"]),
                "duration": float(cls.get("mManufactoringDuration") or 0),
                "is_alternate": "Alternate" in cls["ClassName"],
                "ingredients": ingredients,
                "products": products,
            })

    alternates = sum(1 for r in recipes if r["is_alternate"])
    log.info(
        f"Recettes extraites : {len(recipes)} "
        f"({alternates} alternatives, {skipped_recipes} ignorées)"
    )

    return {"items": items, "recipes": recipes}
