package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.ProducerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ProducerReposiroty extends JpaRepository<ProducerEntity,Long> {
    @Query("SELECT p FROM ProducerEntity p WHERE p.deleted = false")
    Page<ProducerEntity> listProducer(Pageable pageable);

    @Query("SELECT c FROM ProducerEntity c WHERE (c.name LIKE %:condition% OR c.code LIKE %:condition%) AND c.deleted = false")
    Page<ProducerEntity> searchProducer(@Param("condition") String condition, Pageable pageable);
}
