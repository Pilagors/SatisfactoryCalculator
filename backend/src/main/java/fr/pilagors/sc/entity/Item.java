package fr.pilagors.sc.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "items")
@Data
public class Item {
    @Id
    private String id;
    private String name;
    private String description;
    private String form;
    @Column(name = "stack_size")
    private String stackSize;
    @Column(name = "sink_points")
    private Integer sinkPoints;
    @Column(name = "is_resource")
    private Boolean isResource;
    @Column(name = "energy_value")
    private Double energyValue;
}
