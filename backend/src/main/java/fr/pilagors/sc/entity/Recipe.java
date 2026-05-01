package fr.pilagors.sc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Recipe {
    @Id
    private String id;
    private double duration;
}