package fr.pilagors.sc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.pilagors.sc.entity.Item;
import fr.pilagors.sc.service.ItemService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    
    private final ItemService service;

    @GetMapping
    public List<Item> getAll() {
        return service.getAllItems();
    }

    @GetMapping("/not-null")
    public List<Item> getAllNotNull() {
        return service.getAllItemsNotNull();
    }
}
