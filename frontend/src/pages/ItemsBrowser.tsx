import ItemCard from '../components/ui/ItemCard'
import { useAllItemsNotNull } from '../hooks/items/allItemsNotNullHook'

export default function ItemsBrowser() {
  const { items } = useAllItemsNotNull()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Navigateur d'items</h1>
      
      {items.length == 0 && 
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-ring loading-xl snap-center'></span>
        </div>
      }
      <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(384px,1fr))]'>
        {items.map(item => <ItemCard name={item.name} key={item.id}/> )}
      </div>
    </div>
  )
}
