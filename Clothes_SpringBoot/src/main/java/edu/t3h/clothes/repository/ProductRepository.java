package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query(value = "SELECT p FROM ProductEntity p " +
            "LEFT JOIN p.sizeEntities s " +
            "LEFT JOIN p.categoryEntity c " +
            " WHERE " +
            " (:#{#condition.name} is null or lower(p.name) = :#{#condition.name}) " +
            "AND (:#{#condition.price} is null or p.price = :#{#condition.price} )" +
            "AND (:#{#condition.categoryId} is null or c.id = :#{#condition.categoryId} )" +
            "AND (:#{#condition.code} is null or p.code = :#{#condition.code} )" +
            "AND (:#{#condition.sizeId} is null or s.id = :#{#condition.sizeId} ) " +
            "AND p.deleted=false ORDER BY p.createdDate desc "
    )
    Page<ProductEntity> findAllByFilter(@Param("condition")ProductFilterRequest filterRequest, Pageable pageable);
}

/// ddaay laf cai chinhhhh