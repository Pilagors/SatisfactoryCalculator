import ItemCard from '../components/ui/ItemCard'
import { useAllItems } from '../hooks/items/allItemsHook'

export default function ItemsBrowser() {
  const { items } = useAllItems()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Navigateur d'items</h1>
      {items.map(item => <ItemCard name={item.name} key={item.id}/> )}
    </div>
  )
}
