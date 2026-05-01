package fr.pilagors.sc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.pilagors.sc.entity.Recipe;
import fr.pilagors.sc.repository.RecipeRepository;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    private final RecipeRepository repo;

    public RecipeController(RecipeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Recipe> getAll() {
        return repo.findAll();
    }
}
