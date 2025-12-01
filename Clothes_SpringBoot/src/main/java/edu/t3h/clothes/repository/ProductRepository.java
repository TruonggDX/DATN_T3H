package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ProductEntity;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

  @Query(value = "SELECT p FROM ProductEntity p WHERE p.deleted=false "
      + "AND (:code IS NULL OR p.code LIKE CONCAT('%', :code, '%'))"
      + "AND (:name IS NULL OR p.name LIKE CONCAT('%', :name, '%'))"
      + "AND (:cateId IS NULL OR p.categoryEntity.id =:cateId)"
      + "AND (:brandId IS NULL OR p.brandEntity.id =:brandId)")
  Page<ProductEntity> findDeletedProducts(String code, String name, Long cateId,
      Long brandId,Pageable pageable);

  @Query(value = "SELECT p FROM ProductEntity p WHERE p.deleted=false "
      + "AND (:code IS NULL OR p.code LIKE CONCAT('%', :code, '%'))"
      + "AND (:name IS NULL OR p.name LIKE CONCAT('%', :name, '%'))"
      + "AND (:cateId IS NULL OR p.categoryEntity.id =:cateId)"
      + "AND (:brandId IS NULL OR p.brandEntity.id =:brandId)")
  Page<ProductEntity> findProductsByCondition(String code, String name, Long cateId,
      Long brandId, Pageable pageable);

  @Query("SELECT b, COUNT (od.product.id) AS count from ProductEntity b " +
      "join b.orderDetails od " +
      "GROUP BY od.product.id, b.id " +
      "ORDER BY count " +
      "DESC LIMIT 8")
  List<ProductEntity> bestSellerProduct();

  @Query("SELECT b from ProductEntity b where b.deleted=false and b.createdDate >=:createDate")
  List<ProductEntity> newBook(LocalDateTime createDate);

  @Query(value = "SELECT c FROM ProductEntity c WHERE c.deleted=false ")
  List<ProductEntity> getAllDeletedProduct();
}
