package fr.pilagors.sc.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "recipe_products")
@Data
public class RecipeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private Double amount;
}
