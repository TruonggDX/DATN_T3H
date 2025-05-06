package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.OrderDetailsEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailsEntity, Long> {

  @Query(value = "SELECT o FROM OrderDetailsEntity o WHERE o.deleted=false AND o.order.id =:orderId")
  List<OrderDetailsEntity> findAllOrderDetails(Long orderId);
}
