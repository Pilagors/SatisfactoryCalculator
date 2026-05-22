package fr.pilagors.sc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.pilagors.sc.entity.Recipe;
import fr.pilagors.sc.service.RecipeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;

    @GetMapping
    public List<Recipe> getAll() {
        return service.getAllRecipes();
    }

    @GetMapping("/{productId}")
    public List<Recipe> getByProductId(String productId) {
        return service.getRecipesByProductId(productId);
    }
}
