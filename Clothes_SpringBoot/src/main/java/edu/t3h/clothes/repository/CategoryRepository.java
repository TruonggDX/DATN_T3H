package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryRevenueDTO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

  @Query(value =
      "SELECT c FROM CategoryEntity c WHERE c.deleted=false AND (:code IS NULL OR c.code LIKE CONCAT('%', :code, '%')) "
          + "AND (:name IS NULL OR c.name LIKE CONCAT('%', :name, '%'))")
  Page<CategoryEntity> getAll(String code, String name, Pageable pageable);

  @Query("""
          SELECT new edu.t3h.clothes.model.dto.CategoryRevenueDTO(
              c.id,
              c.name,
              SUM(od.quantity * od.price) * 1.0
          )
          FROM OrdersEntity o
          JOIN o.orderDetails od
          JOIN od.product p
          JOIN p.categoryEntity c
          WHERE o.status = 'Hoàn thành'
          GROUP BY c.id, c.name
          ORDER BY SUM(od.quantity * od.price) DESC
      """)
  List<CategoryRevenueDTO> getTotalRevenueByCategory();

}