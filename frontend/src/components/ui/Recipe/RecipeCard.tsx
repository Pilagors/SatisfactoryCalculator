interface RecipeCardProps {
    name: string
    isAlternate?: boolean
    onClick?: () => void
}

export default function RecipeCard({ name, isAlternate, onClick }: RecipeCardProps) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    {isAlternate && <div className="badge badge-secondary">Alternate</div>}
                </h2>
            </div>
        </div>
    )
}
