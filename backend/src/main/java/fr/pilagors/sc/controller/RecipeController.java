package fr.pilagors.sc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.pilagors.sc.entity.Recipe;
import fr.pilagors.sc.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeRepository repo;

    @GetMapping
    public List<Recipe> getAll() {
        return repo.findAll();
    }
}
