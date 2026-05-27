import { api } from "../../api/client";
import { Recipe } from "../../types/recipe";
import { useEffect, useState } from "react";

export function useAllRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        api.get<Recipe[]>('/recipes').then(setRecipes)
    }, [])

    return { recipes }
}