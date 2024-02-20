package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.ProducerEntity;

import java.util.List;

public interface ProducerService  {
    List<ProducerEntity> getAll();
    Boolean creatProducer(ProducerEntity producer);
    ProducerEntity findProducerById(Integer id);
    Boolean updateProducer(ProducerEntity producer);
    Boolean deleteProducer(Integer id);
    List<ProducerEntity> searchProducer(String keyword);
}
