package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity,Long> {

}
