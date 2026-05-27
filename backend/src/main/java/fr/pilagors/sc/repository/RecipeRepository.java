package fr.pilagors.sc.repository;

import fr.pilagors.sc.entity.Recipe;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecipeRepository extends JpaRepository<Recipe, String> {

    @Query(value = "SELECT DISTINCT ON (name) id FROM recipes ORDER BY name", nativeQuery = true)
    List<String> findDistinctIdsByName();

    @EntityGraph(attributePaths = {"ingredients", "products", "ingredients.item", "products.item"})
    @Query("SELECT r FROM Recipe r WHERE r.id IN :ids")
    List<Recipe> findByIdsWithDetails(List<String> ids);

    @Query(value = "SELECT * FROM recipes WHERE id = :productId", nativeQuery = true)
    List<Recipe> findByRecipeId(String productId);
}
