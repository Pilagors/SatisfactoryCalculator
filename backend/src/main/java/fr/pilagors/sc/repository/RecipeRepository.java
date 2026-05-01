package fr.pilagors.sc.repository;

import fr.pilagors.sc.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, String> {}