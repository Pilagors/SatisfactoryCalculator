import { useEffect, useRef, useState } from "react";
import { useAllRecipes } from "../hooks/recipes/allRecipes";
import { Recipe } from "../types/recipe";

import RecipeCard from '../components/ui/Recipe/RecipeCard'
import RecipeDetailsCard from '../components/ui/Recipe/RecipeDetailsCard'

export default function RecipesBrowser() {
  const { recipes } = useAllRecipes()
  const [search, setSearch] = useState('')
  const [recipeSidebar, setRecipeSidebar] = useState(false)
  const [recipeFocused, setRecipeFocused] = useState<Recipe | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (recipeFocused) detailRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [recipeFocused])

  const onRecipeClick = (recipe: Recipe) => {
    setRecipeSidebar(true)
    setRecipeFocused(recipe)
  }

  return (
    <div>
      <div className='navbar bg-base-100 shadow-md mb-4 rounded-md'>
        <h1 className="flex-1 text-2xl font-bold">Navigateur de recettes</h1>

        <div className='flex gap-2'>
          <input type="text" placeholder='Search' className='input input-bordered w-24 md:w-auto' onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>

      {recipes.length == 0 &&
        <div className='flex items-center justify-center h-screen'>
          <span className='loading loading-ring loading-xl snap-center'></span>
        </div>
      }

      <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(384px,1fr))]'>
        {recipeFocused && recipeSidebar &&
          <div ref={detailRef} className='col-span-2 row-span-3'>
            <RecipeDetailsCard recipe={recipeFocused} />
          </div>
        }

        {recipes
          .filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))
          .filter(recipe => recipe.id !== recipeFocused?.id)
          .map(recipe => (
            <RecipeCard
              key={recipe.id}
              name={recipe.name}
              isAlternate={recipe.isAlternate}
              onClick={() => onRecipeClick(recipe)}
            />
          ))
        }
      </div>
    </div>
  )
}
