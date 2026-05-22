package fr.pilagors.sc.repository;

import fr.pilagors.sc.entity.Recipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecipeRepository extends JpaRepository<Recipe, String> {
    
    @Query(value = "SELECT * FROM recipes WHERE id = :productId", nativeQuery = true)
    List<Recipe> findByRecipeId(String productId);
}