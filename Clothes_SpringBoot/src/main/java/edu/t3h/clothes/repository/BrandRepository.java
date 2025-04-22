package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.BrandEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BrandRepository extends JpaRepository<BrandEntity, Long> {

  @Query(value = "SELECT b FROM BrandEntity b WHERE b.deleted=false")
  Page<BrandEntity> findDeletedBrands(Pageable pageable);

  @Query(value = "SELECT b FROM BrandEntity b WHERE b.deleted=false AND (:name IS NULL OR b.name LIKE CONCAT('%', :name, '%'))")
  Page<BrandEntity> findBrandsByName(String name, Pageable pageable);

}
