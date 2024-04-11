package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.request.OrderFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<OrdersEntity, Long> {
    @Query(value = "SELECT o FROM OrdersEntity o " +
            "LEFT JOIN o.user u " +
            "LEFT JOIN o.product p " +
            "WHERE " +
            "(:#{#condition.code} is null or lower(o.code) = :#{#condition.code}) " +
            "AND (:#{#condition.price} is null or o.price = :#{#condition.price} )" +
            "AND (:#{#condition.quantity} is null or o.quantity = :#{#condition.quantity} )" +
            "AND (:#{#condition.status} is null or o.status = :#{#condition.status} )" +
            "AND (:#{#condition.userId} is null or u.id = :#{#condition.userId} )" +
            "AND (:#{#condition.productId} is null or p.id = :#{#condition.productId} ) " +
            "AND o.deleted = false ORDER BY o.createdDate DESC"
    )
    Page<OrdersEntity> findAllByFilter(@Param("condition")OrderFilterRequest filterRequest, Pageable pageable);



    @Query("SELECT o FROM OrdersEntity o WHERE (o.user.id IN (SELECT u.id FROM UserEntity u WHERE u.name LIKE %:condition% AND u.deleted=false) OR o.code LIKE %:condition%) AND o.deleted = false")
    List<OrdersEntity> searchOrders(@Param("condition") String condition);


}

