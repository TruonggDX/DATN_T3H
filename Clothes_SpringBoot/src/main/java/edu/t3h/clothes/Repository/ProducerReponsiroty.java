package edu.t3h.clothes.Repository;

import edu.t3h.clothes.Entity.Category;
import edu.t3h.clothes.Entity.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProducerReponsiroty extends JpaRepository<Producer,Integer> {
    @Query("SELECT c FROM Producer c WHERE c.name LIKE %?1%")
    List<Producer> searchProducer(String keyword);
}
