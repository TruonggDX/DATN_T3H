package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.VariantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantRepository extends JpaRepository<VariantEntity,Long> {

}
