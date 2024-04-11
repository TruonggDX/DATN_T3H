package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query(value = "SELECT distinct p FROM ProductEntity p " +
            "LEFT JOIN p.sizeEntities s " +
            "LEFT JOIN p.categoryEntity c " +
            "LEFT JOIN p.producerEntity m " +
            " WHERE " +
            " (:#{#condition.name} is null or lower(p.name) = :#{#condition.name}) " +
            "AND (:#{#condition.price} is null or p.price = :#{#condition.price} )" +
            "AND (:#{#condition.categoryId} is null or c.id = :#{#condition.categoryId} )" +
            "AND (:#{#condition.producerId} is null or m.id = :#{#condition.producerId} )" +
            "AND (:#{#condition.code} is null or p.code = :#{#condition.code} )" +
            "AND (:#{#condition.sizeId} is null or s.id = :#{#condition.sizeId} ) " +
            "AND p.deleted=false ORDER BY p.createdDate desc "
    )
    Page<ProductEntity> findAllByFilter(@Param("condition")ProductFilterRequest filterRequest, Pageable pageable);

    @Query("SELECT p FROM ProductEntity p LEFT JOIN p.categoryEntity c WHERE c.id = :categoryId AND p.deleted=false")
    List<ProductEntity> findProductsByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM ProductEntity p WHERE p.name LIKE %:name%")
    List<ProductEntity> findProductsByName(@Param("name") String name);


    @Query("SELECT p FROM ProductEntity p WHERE  p.name LIKE %:condition% OR p.code LIKE  %:condition% AND p.deleted=false")
    List<ProductEntity> searchProductByNameAndCode(@Param("condition") String condition);


    @Query("SELECT p FROM ProductEntity p " +
            "LEFT JOIN p.product o " +
            "LEFT JOIN p.categoryEntity c " +
            "WHERE p.deleted = false " +
            "GROUP BY p.id " +
            "HAVING COUNT(o.id) >= 3 " +
            "ORDER BY p.createdDate DESC"
    )
    List<ProductEntity> productBestSeller();


    @Query("SELECT p FROM ProductEntity p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<ProductEntity> findProductsInPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

}




