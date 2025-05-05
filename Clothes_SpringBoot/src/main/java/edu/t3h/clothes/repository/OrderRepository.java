package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.OrdersEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrdersEntity, Long> {

  @Query(value = "SELECT o FROM OrdersEntity o WHERE o.deleted=false")
  Page<OrdersEntity> findAllOrders(Pageable pageable);

  @Query(value = "SELECT o FROM OrdersEntity o WHERE o.deleted=false "
      + "AND (:code IS NULL OR o.code LIKE CONCAT('%', :code, '%')) "
      + "AND (:status IS NULL OR o.status LIKE CONCAT('%', :status, '%'))")
  Page<OrdersEntity> findOrderByCondition(String code, String status, Pageable pageable);

  @Query("SELECT o FROM OrdersEntity o WHERE o.deleted = false AND o.account.id = :accountId")
  Page<OrdersEntity> findAllByAccountIdAndDeletedFalse(Long accountId, Pageable pageable);

}
