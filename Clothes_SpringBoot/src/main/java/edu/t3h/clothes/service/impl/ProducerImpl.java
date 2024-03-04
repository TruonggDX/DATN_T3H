package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.ProducerReponsiroty;
import edu.t3h.clothes.service.IProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class ProducerImpl implements IProducerService {

    private ProducerReponsiroty producerReponsiroty;
    private Model model;


    @Override
    public BaseResponse<List<ProducerDTO>> getAll() {
        return null;
    }

    @Override
    public BaseResponse<?> creatProducer(ProducerDTO producerDTO) {
        return null;
    }

    @Override
    public ProducerDTO findByProducerById(Long id) {
        return null;
    }

    @Override
    public BaseResponse<?> deleteProducer(Long id) {
        return null;
    }

    @Override
    public BaseResponse<?> updateProducer(Long id, ProducerDTO producerDTO) {
        return null;
    }

//    @Override
//    public List<ProducerEntity> getAll() {
//        return this.producerReponsiroty.findAll();
//    }
//
//    @Override
//    public Boolean creatProducer(ProducerEntity producer) {
//        try {
//            this.producerReponsiroty.save(producer);
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    @Override
//    public ProducerEntity findProducerById(Integer id) {
//        return this.producerReponsiroty.findById(id).get();
//    }
//
//    @Override
//    public Boolean updateProducer(ProducerEntity producer) {
//        try {
//            this.producerReponsiroty.save(producer);
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    @Override
//    public Boolean deleteProducer(Integer id) {
//        try {
//            this.producerReponsiroty.delete(findProducerById(id));
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    @Override
//    public List<ProducerEntity> searchProducer(String keyword) {
//        return this.producerReponsiroty.searchProducer(keyword);
//    }


}
