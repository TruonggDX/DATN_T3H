package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
  @Query(value = "SELECT c FROM CategoryEntity c WHERE c.deleted=false")
  Page<CategoryEntity> getAll(Pageable pageable);

  @Query(value = "SELECT c FROM CategoryEntity c WHERE c.deleted=false AND c.parent IS NULL")
  Page<CategoryEntity> findAllCategories(Pageable pageable);

  @Query(value = "SELECT c FROM CategoryEntity c WHERE c.deleted=false AND c.parent.id=:parentId")
  List<CategoryEntity> findAllCategoriesByParentId(@Param("parentId") Long parentId);

  @Query(value = "SELECT c FROM CategoryEntity c WHERE c.deleted = false AND c.parent.code = :code")
  List<CategoryEntity> findByParentCode(String code);

  @Query(value = "SELECT c FROM CategoryEntity c " +
      "WHERE (:name IS NULL OR c.name LIKE CONCAT('%', :name, '%')) " +
      "AND c.deleted = false")
  Page<CategoryEntity> searchCategories(@Param("name") String name, Pageable pageable);
}