package edu.t3h.clothes.Service;

import edu.t3h.clothes.Entity.Producer;
import edu.t3h.clothes.Repository.ProducerReponsiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerImpl implements ProducerService{
    @Autowired
    private ProducerReponsiroty producerReponsiroty;
    @Override
    public List<Producer> getAll() {
        return this.producerReponsiroty.findAll();
    }

    @Override
    public Boolean creatProducer(Producer producer) {
        try {
            this.producerReponsiroty.save(producer);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Producer findProducerById(Integer id) {
        return this.producerReponsiroty.findById(id).get();
    }

    @Override
    public Boolean updateProducer(Producer producer) {
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
    public List<Producer> searchProducer(String keyword) {
        return this.producerReponsiroty.searchProducer(keyword);
    }


}
