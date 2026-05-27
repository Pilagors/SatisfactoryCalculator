import type { Item } from './item'

export interface RecipeIngredient {
  id: number
  item: Item
  amount: number
}

export interface Recipe {
  id: string
  name: string
  duration: number
  isAlternate: boolean
  ingredients: RecipeIngredient[]
  products: RecipeIngredient[]
}
