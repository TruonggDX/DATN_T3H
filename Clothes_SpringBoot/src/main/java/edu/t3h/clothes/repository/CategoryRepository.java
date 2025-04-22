package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

  @Query("SELECT c FROM CategoryEntity c WHERE c.deleted = false")
  Page<CategoryEntity> listCategory(Pageable pageable);

  @Query("SELECT c FROM CategoryEntity c " +
      "WHERE (:name IS NULL OR c.name LIKE CONCAT('%', :name, '%')) " +
      "AND (:code IS NULL OR c.code LIKE CONCAT('%', :code, '%')) " +
      "AND c.deleted = false")
  Page<CategoryEntity> searchCategories(@Param("code") String code, @Param("name") String name,
      Pageable pageable);
}