package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.BlogsEntity;
import edu.t3h.clothes.entity.ProductEntity;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogsRepository extends JpaRepository<BlogsEntity, Long> {

  @Query(value = "SELECT b FROM BlogsEntity b " +
      "WHERE b.deleted = false " +
      "AND (:code IS NULL OR b.code LIKE CONCAT('%', :code, '%')) " +
      "AND (:title IS NULL OR b.title LIKE CONCAT('%', :title, '%')) " +
      "AND (:nameCate IS NULL OR b.categoryEntity.name LIKE CONCAT('%', :nameCate, '%'))")
  Page<BlogsEntity> findAllByDeletedFalse(String code, String title, String nameCate,
      Pageable pageable);

  @Query("SELECT b FROM BlogsEntity b WHERE b.deleted = false AND b.createdDate >= :createDate ORDER BY b.createdDate DESC LIMIT 3")
  List<BlogsEntity> findNewBlogs(LocalDateTime createDate);

}
