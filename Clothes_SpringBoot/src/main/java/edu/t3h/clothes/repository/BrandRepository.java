package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.model.dto.BrandRevenueDTO;
import edu.t3h.clothes.model.dto.CategoryRevenueDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BrandRepository extends JpaRepository<BrandEntity, Long> {

  @Query(value = "SELECT b FROM BrandEntity b WHERE b.deleted=false AND (:code IS NULL OR b.code LIKE CONCAT('%', :code, '%')) AND (:name IS NULL OR b.name LIKE CONCAT('%', :name, '%'))")
  Page<BrandEntity> findDeletedBrands(String code, String name,Pageable pageable);

  @Query(value = "SELECT b FROM BrandEntity b WHERE b.deleted=false AND (:name IS NULL OR b.name LIKE CONCAT('%', :name, '%'))")
  Page<BrandEntity> findBrandsByName(String name, Pageable pageable);

  @Query("""
          SELECT new edu.t3h.clothes.model.dto.BrandRevenueDTO(
              c.id,
              c.name,
              SUM(od.quantity * od.price) * 1.0
          )
          FROM OrdersEntity o
          JOIN o.orderDetails od
          JOIN od.product p
          JOIN p.brandEntity c
          WHERE o.status = 'Hoàn thành'
          GROUP BY c.id, c.name
          ORDER BY SUM(od.quantity * od.price) DESC
      """)
  List<BrandRevenueDTO> getTotalRevenueByBrand();
}
