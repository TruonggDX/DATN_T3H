package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.AttributeValueEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AttributeValueRepository extends JpaRepository<AttributeValueEntity, Long> {

  @Query(value = "SELECT a FROM AttributeValueEntity a WHERE a.deleted=false")
  Page<AttributeValueEntity> findAllDeletedAttributes(Pageable pageable);

  @Query(value =
      "SELECT a FROM AttributeValueEntity a WHERE a.deleted=false AND (:value IS NULL OR a.value LIKE CONCAT('%', :value, '%'))"
          + "AND (:attributeId IS NULL OR a.attribute.id =: attributeId)")
  Page<AttributeValueEntity> searchByCondition(@Param("value") String value,
      @Param("attributeId") Long attributeId, Pageable pageable);
}
