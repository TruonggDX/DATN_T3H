package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryReponsitory extends JpaRepository<CategoryEntity, Long> {
    @Query("SELECT c FROM CategoryEntity c WHERE c.deleted = false")
    List<CategoryEntity> listCategory();
}
