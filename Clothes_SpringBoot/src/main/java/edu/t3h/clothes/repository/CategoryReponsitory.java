package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryReponsitory extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.name LIKE %?1%")
    List<Category> searchCategory(String keyword);
}
