import type { Item } from './item'

export interface RecipeIngredient {
  item: Item
  amount: number
}

export interface Recipe {
  id: string
  duration: number
  inputs: RecipeIngredient[]
  outputs: RecipeIngredient[]
}
