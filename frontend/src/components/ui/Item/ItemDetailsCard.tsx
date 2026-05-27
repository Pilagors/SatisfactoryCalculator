import { Item } from "../types/item"

interface ItemDetailsCardProps {
    item: Item
}

export default function ItemCard({ item }: ItemDetailsCardProps) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
            <div className="card-body">
                <h2 className="card-title">
                    {item.name}
                    <div className="badge badge-neutral">{item.id}</div>
                </h2>
                <p>{item.description}</p>

                <div className="card-actions justify-end">
                    <div className={`badge ${item.isResource ? 'badge-primary' : 'badge-secondary'}`}>{item.isResource ? <p>Resource</p> : <p>Craftable</p>}</div>
                    <div className="badge badge-accent"> {item.sinkPoints} sink points </div>
                    <div className="badge badge-neutral"> {item.energyValue} energy value </div>
                </div>
            </div>
        </div>
    )
}