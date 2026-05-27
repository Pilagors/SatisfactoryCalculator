package fr.pilagors.sc.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Set;

@Entity
@Table(name = "recipes")
@Data
@EqualsAndHashCode(exclude = {"ingredients", "products"})
public class Recipe {
    @Id
    private String id;
    private String name;
    private Double duration;
    @Column(name = "is_alternate")
    private Boolean isAlternate;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private Set<RecipeIngredient> ingredients;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private Set<RecipeProduct> products;
}
