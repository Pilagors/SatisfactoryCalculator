package fr.pilagors.sc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.pilagors.sc.entity.Item;
import fr.pilagors.sc.repository.ItemRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {
    
    private final ItemRepository repository;

    public List<Item> getAllItems() {
        return repository.findAll();
    }
}
