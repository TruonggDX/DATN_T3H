package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ImageProductEntity;
import edu.t3h.clothes.model.request.ProductImageFilterRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<ImageProductEntity,Long> {
    @Query(value = "SELECT i FROM ImageProductEntity i " +
            "LEFT JOIN i.productEntities p " +
            "WHERE " +
            "(:#{#condition.productId} is null or p.id =:#{#condition.productId})" +
            "AND i.deleted =false ORDER BY i.createdDate limit 1"
    )
    ImageProductEntity findImageProductById(@Param("condition")ProductImageFilterRequest filterRequest);
}
