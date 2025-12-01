package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.OrderDetailsEntity;
import edu.t3h.clothes.model.dto.RevenueStatisticsDTO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailsEntity, Long> {

  @Query(value = "SELECT o FROM OrderDetailsEntity o WHERE o.deleted=false AND o.order.id =:orderId")
  List<OrderDetailsEntity> findAllOrderDetails(Long orderId);

  @Query("SELECT SUM(od.quantity) FROM OrderDetailsEntity od " +
      "WHERE od.product.id = :productId AND od.order.status='Hoàn thành'")
  Long getTotalSoldByProductId(Long productId);

  List<OrderDetailsEntity> findByOrderId(Long orderId);

  @Query("""
          SELECT CASE WHEN COUNT(od) > 0 THEN true ELSE false END
          FROM OrderDetailsEntity od
          WHERE od.product.id = :productId
          AND od.order.account.email = :email
          AND od.order.status = 'Hoàn thành'
      """)
  boolean existsCompletedOrderForProduct(Long productId, String email);

  OrderDetailsEntity findFirstByOrderId(Long orderId);

  @Query(value = """
          SELECT DATE_FORMAT(od.created_date, '%Y-%m-%d') AS period,
                 SUM(od.quantity * od.price) AS totalRevenue
          FROM order_details od
                   JOIN orders o ON od.orders_id = o.id
          WHERE o.status = 'Hoàn thành'
          GROUP BY DATE_FORMAT(od.created_date, '%Y-%m-%d')
          ORDER BY DATE_FORMAT(od.created_date, '%Y-%m-%d')
      """, nativeQuery = true)
  List<Object[]> revenueByDay();

  @Query(value = """
          SELECT DATE_FORMAT(od.created_date, '%Y-%m') AS period,
                 SUM(od.quantity * od.price) AS totalRevenue
          FROM order_details od
                   JOIN orders o ON od.orders_id = o.id
          WHERE o.status = 'Hoàn thành'
          GROUP BY DATE_FORMAT(od.created_date, '%Y-%m')
          ORDER BY DATE_FORMAT(od.created_date, '%Y-%m')
      """, nativeQuery = true)
  List<Object[]> revenueByMonth();

  @Query(value = """
          SELECT DATE_FORMAT(od.created_date, '%Y') AS period,
                 SUM(od.quantity * od.price) AS totalRevenue
          FROM order_details od
                   JOIN orders o ON od.orders_id = o.id
          WHERE o.status = 'Hoàn thành'
          GROUP BY DATE_FORMAT(od.created_date, '%Y')
          ORDER BY DATE_FORMAT(od.created_date, '%Y')
      """, nativeQuery = true)
  List<Object[]> revenueByYear();

}
