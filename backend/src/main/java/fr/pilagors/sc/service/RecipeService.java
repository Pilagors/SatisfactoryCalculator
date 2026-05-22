package fr.pilagors.sc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.pilagors.sc.entity.Recipe;
import fr.pilagors.sc.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {
    
    private final RecipeRepository repository;

    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    public List<Recipe> getRecipesByProductId(String productId) {
        return repository.findByRecipeId(productId);
    }
}
