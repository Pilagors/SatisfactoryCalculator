package fr.pilagors.sc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.pilagors.sc.entity.Item;

public interface ItemRepository extends JpaRepository<Item, String> {
    public List<Item> findAll();
}
