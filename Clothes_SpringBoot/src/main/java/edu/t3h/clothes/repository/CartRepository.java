package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartEntity,Long> {
    @Query(value = "SELECT c FROM CartEntity c " +
            "LEFT JOIN c.product p " +
            "LEFT JOIN c.user u " +
            "WHERE " +
            "(:userId is null or u.id = :userId) " +
            "AND (:#{#condition.id} is null or c.id = :#{#condition.id}) " +
            "AND (:#{#condition.price} is null or c.price = :#{#condition.price} )" +
            "AND (:#{#condition.number} is null or c.number = :#{#condition.number} )" +
            "AND (:#{#condition.total} is null or c.total = :#{#condition.total} )" +
            "AND (:#{#condition.userId} is null or u.id = :#{#condition.userId} )" +
            "AND (:#{#condition.nameUser} is null or u.name = :#{#condition.nameUser} )" +
            "AND (:#{#condition.productId} is null or p.id = :#{#condition.productId} ) " +
            "AND (:#{#condition.nameProduct} is null or u.name = :#{#condition.nameProduct} )" +
            "AND c.deleted=false ORDER BY c.createdDate desc "
    )
    Page<CartEntity> findAllByFilter(@Param("condition") CartFilterRequest filterRequest, @Param("userId") Long userId, Pageable pageable);


    @Query(value = "SELECT COUNT(*) FROM CartEntity c WHERE c.deleted=false AND c.user.id =:uid")
    Long countProductOfUser(@Param("uid") Long uid);
}
