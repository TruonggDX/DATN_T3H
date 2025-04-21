package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.ProducerDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;


public interface IProducerService {

  ResponsePage<List<ProducerDto>> getAll(Pageable pageable);

  BaseResponse<ProducerDto> creatProducer(ProducerDto producerDTO);

  BaseResponse<ProducerDto> findByProducerById(Long id);

  BaseResponse<ProducerDto> deleteProducer(Long id);

  BaseResponse<ProducerDto> updateProducer(Long id, ProducerDto producerDTO);

  ResponsePage<List<ProducerDto>> searchProducerByCondition(String name,String code,String address,String phone,Pageable pageable);

}
