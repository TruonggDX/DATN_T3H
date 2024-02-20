package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.repository.ProducerReponsiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerImpl implements ProducerService{
    @Autowired
    private ProducerReponsiroty producerReponsiroty;
    @Override
    public List<ProducerEntity> getAll() {
        return this.producerReponsiroty.findAll();
    }

    @Override
    public Boolean creatProducer(ProducerEntity producer) {
        try {
            this.producerReponsiroty.save(producer);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public ProducerEntity findProducerById(Integer id) {
        return this.producerReponsiroty.findById(id).get();
    }

    @Override
    public Boolean updateProducer(ProducerEntity producer) {
        try {
            this.producerReponsiroty.save(producer);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Boolean deleteProducer(Integer id) {
        try {
            this.producerReponsiroty.delete(findProducerById(id));
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<ProducerEntity> searchProducer(String keyword) {
        return this.producerReponsiroty.searchProducer(keyword);
    }


}
