package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.PaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

  @Query(value = "SELECT p FROM PaymentEntity p WHERE p.deleted=false ")
  Page<PaymentEntity> findAllByDeletedFalse(Pageable pageable);
}
