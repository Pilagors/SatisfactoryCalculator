interface ItemCardProps {
    name: string
    imageUrl?: string
    onClick?: () => void
}

export default function ItemCard({ name, imageUrl, onClick }: ItemCardProps) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow" onClick={onClick}>
            <figure>
                <img src={imageUrl} alt={`item-${name}`} />
            </figure>

            <div className="card-body">
                <h2 className="card-title">{name}</h2>
            </div>
        </div>
    )
}