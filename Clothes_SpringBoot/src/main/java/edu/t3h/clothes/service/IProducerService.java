package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProducerService {
    BaseResponse<Page<ProducerDTO>> getAll(int page, int size);
    BaseResponse<?> creatProducer(ProducerDTO producerDTO);
    ProducerDTO findByProducerById(Long id);
    BaseResponse<?> deleteProducer(Long id);
    BaseResponse<?> updateProducer(Long id, ProducerDTO producerDTO);

    BaseResponse<Page<ProducerDTO>> searchProducerByCondition(String condition, int page, int size);

}
