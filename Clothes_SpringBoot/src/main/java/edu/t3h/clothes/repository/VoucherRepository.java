package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.VoucherEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoucherRepository extends JpaRepository<VoucherEntity, Long> {

  @Query("SELECT v FROM VoucherEntity v WHERE v.deleted = false AND " +
      "(:code IS NULL OR v.code LIKE CONCAT('%', :code, '%'))")
  Page<VoucherEntity> findByCode(@Param("code") String code, Pageable pageable);

  @Query("SELECT v FROM VoucherEntity v WHERE v.deleted = false AND " +
      "(:status IS NULL OR v.status = :status)")
  Page<VoucherEntity> findByStatus(@Param("status") Boolean status, Pageable pageable);

  @Query("SELECT v FROM VoucherEntity v WHERE v.deleted = false AND " +
      "(:name IS NULL OR v.name LIKE CONCAT('%', :name, '%'))")
  Page<VoucherEntity> findByName(@Param("name") String name, Pageable pageable);

  @Query("SELECT v FROM VoucherEntity v WHERE v.deleted = false")
  Page<VoucherEntity> findAllActive(Pageable pageable);
}
