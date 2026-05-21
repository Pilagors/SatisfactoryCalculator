interface ItemCardProps {
    name: string
    imageUrl?: string
}

export default function ItemCard({ name, imageUrl }: ItemCardProps) {
    return (
        <div className="card bg-base-100 w-96 shadow-md m-8 hover:shadow-xl transition-shadow">
            <figure>
                <img src={imageUrl} alt={`item-${name}`} />
            </figure>

            <div className="card-body">
                <h2 className="card-title">{name}</h2>
            </div>
        </div>
    )
}