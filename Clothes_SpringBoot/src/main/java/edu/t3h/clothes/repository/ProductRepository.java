package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

  @Query(value = "SELECT p FROM ProductEntity p WHERE p.deleted=false")
  Page<ProductEntity> findDeletedProducts(Pageable pageable);

}
