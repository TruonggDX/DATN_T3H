package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.Producer;

import java.util.List;

public interface ProducerService  {
    List<Producer> getAll();
    Boolean creatProducer(Producer producer);
    Producer findProducerById(Integer id);
    Boolean updateProducer(Producer producer);
    Boolean deleteProducer(Integer id);
    List<Producer> searchProducer(String keyword);
}
