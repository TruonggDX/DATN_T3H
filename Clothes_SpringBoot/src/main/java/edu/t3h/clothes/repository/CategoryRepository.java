package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

  @Query("SELECT c FROM CategoryEntity c WHERE c.deleted = false")
  Page<CategoryEntity> listCategory(Pageable pageable);

  @Query("SELECT c FROM CategoryEntity c WHERE (c.name LIKE %:condition% OR c.code LIKE %:condition%) AND c.deleted = false")
  Page<CategoryEntity> searchCategories(@Param("condition") String condition, Pageable pageable);
}