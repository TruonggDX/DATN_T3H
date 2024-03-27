package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ProducerProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProducerProductRepository extends JpaRepository<ProducerProductEntity, Long> {

}
