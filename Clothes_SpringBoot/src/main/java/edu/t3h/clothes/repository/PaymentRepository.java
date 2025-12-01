package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.PaymentEntity;
import edu.t3h.clothes.model.dto.CategoryRevenueDTO;
import edu.t3h.clothes.model.dto.PaymentRevenueDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

  @Query(value = "SELECT p FROM PaymentEntity p WHERE p.deleted=false ")
  Page<PaymentEntity> findAllByDeletedFalse(Pageable pageable);

  @Query(value = "SELECT p FROM PaymentEntity p WHERE p.deleted=false AND p.ordersEntity.id=:orderId")
  Optional<PaymentEntity> findByOrderId(@Param("orderId") Long orderId);

  @Query("""
            SELECT new edu.t3h.clothes.model.dto.PaymentRevenueDTO(
                p.id,
                p.paymentMethod,
                SUM(od.quantity * od.price) * 1.0
            )
            FROM PaymentEntity p
            JOIN p.ordersEntity o
            JOIN o.orderDetails od
            WHERE o.status = 'Hoàn thành'
            GROUP BY p.id, p.paymentMethod
            ORDER BY SUM(od.quantity * od.price) DESC
      """)
  List<PaymentRevenueDTO> getTotalRevenueByPaymentMethod();

}
