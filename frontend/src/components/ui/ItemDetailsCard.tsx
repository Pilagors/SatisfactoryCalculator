import { Item } from "../types/item"

interface ItemDetailsCardProps {
    item: Item
}

export default function ItemCard({ item }: ItemDetailsCardProps) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.description}</p>
            </div>
        </div>
    )
}