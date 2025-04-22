package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.AttributeEntity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AttributeRepository extends JpaRepository<AttributeEntity, Long> {

  @Query(value = "SELECT a FROM AttributeEntity a WHERE a.deleted=false ")
  Page<AttributeEntity> findAllByDeletedFalse(Pageable pageable);

  @Query(value = "SELECT a FROM AttributeEntity a WHERE a.deleted=false AND (:name IS NULL OR a.name LIKE CONCAT('%', :name, '%'))")
  List<AttributeEntity> findByName(String name);
}
