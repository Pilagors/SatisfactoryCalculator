import { useState } from 'react'
import ItemCard from '../components/ui/ItemCard'
import { useAllItemsNotNull } from '../hooks/items/allItemsNotNullHook'

export default function ItemsBrowser() {
  const { items } = useAllItemsNotNull()
  const [search, setSearch] = useState('')

  return (
    <div>
      <div className='navbar bg-base-100 shadow-md mb-4 rounded-md'>
        <h1 className="flex-1 text-2xl font-bold">Navigateur d'items</h1>

        <div className='flex gap-2'>
          <input type="text" placeholder='Search' className='input input-bordered w-24 md:w-auto' onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>

      {items.length == 0 && 
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-ring loading-xl snap-center'></span>
        </div>
      }

      <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(384px,1fr))]'>
        {items
          .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
          .map(item => <ItemCard name={item.name} key={item.id}/> )
        }
      </div>
    </div>
  )
}
