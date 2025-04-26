package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.VoucherEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VoucherRepository extends JpaRepository<VoucherEntity, Long> {

  @Query(value = "SELECT v FROM VoucherEntity v WHERE v.deleted=false AND (:code IS NULL OR v.code LIKE CONCAT('%', :code, '%'))")
  Page<VoucherEntity> findByCode(String code, Pageable pageable);

  @Query("SELECT v FROM VoucherEntity v WHERE v.deleted = false")
  Page<VoucherEntity> findAllActive(Pageable pageable);
}
