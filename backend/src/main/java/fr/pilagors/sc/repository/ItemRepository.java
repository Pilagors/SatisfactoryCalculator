package fr.pilagors.sc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.pilagors.sc.entity.Item;

public interface ItemRepository extends JpaRepository<Item, String> {
    public List<Item> findAll();

    @Query("SELECT i FROM Item i WHERE i.name <> '' and i.description <> '' order by name asc")
    public List<Item> findAllNotNull();
}
