package edu.t3h.clothes.Service;

import edu.t3h.clothes.Entity.Category;
import edu.t3h.clothes.Entity.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProducerService  {
    List<Producer> getAll();
    Boolean creatProducer(Producer producer);
    Producer findProducerById(Integer id);
    Boolean updateProducer(Producer producer);
    Boolean deleteProducer(Integer id);
    List<Producer> searchProducer(String keyword);
}
