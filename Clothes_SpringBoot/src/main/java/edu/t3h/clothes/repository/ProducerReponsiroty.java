package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ProducerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProducerReponsiroty extends JpaRepository<ProducerEntity,Long> {
    @Query("SELECT c FROM ProducerEntity c WHERE c.name LIKE %?1%")
    List<ProducerEntity> searchProducer(String keyword);
}
