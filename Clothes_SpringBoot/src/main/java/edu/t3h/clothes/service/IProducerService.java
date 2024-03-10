package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;

import java.util.List;

public interface IProducerService {
    BaseResponse<List<ProducerDTO>> getAll();
    BaseResponse<?> creatProducer(ProducerDTO producerDTO);
    ProducerDTO findByProducerById(Long id);
    BaseResponse<?> deleteProducer(Long id);
    BaseResponse<?> updateProducer(Long id, ProducerDTO producerDTO);

    BaseResponse<List<ProducerDTO>> searchProducerByCondition(String condition);
}
