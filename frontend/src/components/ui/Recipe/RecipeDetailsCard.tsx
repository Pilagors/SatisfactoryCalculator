import { Recipe } from '../../../types/recipe'

interface RecipeDetailsCardProps {
    recipe: Recipe
}

export default function RecipeDetailsCard({ recipe }: RecipeDetailsCardProps) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
            <div className="card-body">
                <h2 className="card-title">
                    {recipe.name}
                    <div className="badge badge-neutral">{recipe.id}</div>
                    {recipe.isAlternate && <div className="badge badge-secondary">Alternate</div>}
                </h2>
                <p className="text-sm text-base-content/60">Durée : {recipe.duration}s</p>

                <div className="divider">Ingrédients</div>
                <ul className="flex flex-col gap-1">
                    {recipe.ingredients.map(ing => (
                        <li key={ing.id} className="flex justify-between">
                            <span>{ing.item.name}</span>
                            <span className="badge badge-outline">× {ing.amount}</span>
                        </li>
                    ))}
                </ul>

                <div className="divider">Produits</div>
                <ul className="flex flex-col gap-1">
                    {recipe.products.map(prod => (
                        <li key={prod.id} className="flex justify-between">
                            <span>{prod.item.name}</span>
                            <span className="badge badge-primary">× {prod.amount}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
