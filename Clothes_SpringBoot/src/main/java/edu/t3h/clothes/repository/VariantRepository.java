package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.VariantEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VariantRepository extends JpaRepository<VariantEntity, Long> {

  @Query(value = "SELECT v FROM VariantEntity v WHERE v.deleted=false")
  Page<VariantEntity> findAllByDeletedFalse(Pageable pageable);

  @Query(value = "SELECT v FROM VariantEntity v WHERE v.deleted=false AND (:code IS NULL OR v.code LIKE CONCAT('%', :code, '%') AND (:productName IS NULL OR v.productEntity.name LIKE CONCAT('%', :productName, '%')))")
  Page<VariantEntity> findAllByCodeAndProductName(String code, String productName,
      Pageable pageable);
}
