package fr.pilagors.sc.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "recipes")
@Data
public class Recipe {
    @Id
    private String id;
    private String name;
    private Double duration;
    @Column(name = "is_alternate")
    private Boolean isAlternate;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private List<RecipeIngredient> ingredients;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private List<RecipeProduct> products;
}
