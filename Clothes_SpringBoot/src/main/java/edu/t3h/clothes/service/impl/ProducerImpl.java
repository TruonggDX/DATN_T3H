package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.ProducerReponsiroty;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProducerImpl implements IProducerService {
@Autowired
    private ProducerReponsiroty producerReponsiroty;
@Autowired
    private  ModelMapper modelMapper;



    @Override
    public BaseResponse<List<ProducerDTO>> getAll() {
        List<ProducerEntity> producerEntities = producerReponsiroty.listProducer();
        List<ProducerDTO> producerDTOS = producerEntities.stream()
                .map(producerEntity -> modelMapper.map(producerEntity, ProducerDTO.class))
                .collect(Collectors.toList());

        BaseResponse<List<ProducerDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(producerDTOS);

        return response;
    }

    @Override
    public BaseResponse<?> creatProducer(ProducerDTO producerDTO) {
        ProducerEntity producerEntity = modelMapper.map(producerDTO, ProducerEntity.class);
        producerEntity.setDeleted(false);
        producerEntity.setCreatedDate(LocalDateTime.now());
        producerEntity = producerReponsiroty.save(producerEntity);
        producerDTO.setId(producerEntity.getId());
        BaseResponse<ProducerDTO> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(producerDTO);
        return response;
    }

    @Override
    public ProducerDTO findByProducerById(Long id) {
        Optional<ProducerEntity> producerEntityOptional = producerReponsiroty.findById(id);
        ProducerEntity producerEntity = null;
        BaseResponse<ProducerDTO> response;

        if (producerEntityOptional.isEmpty()){
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ProducerDTO.class);
        } else {
            producerEntity = producerEntityOptional.get();
            if (producerEntity.getDeleted()){
                response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null );
                return modelMapper.map(response, ProducerDTO.class);
            }
        }
        return modelMapper.map(producerEntity, ProducerDTO.class);
    }

    @Override
    public BaseResponse<?> deleteProducer(Long id) {
        Optional<ProducerEntity> producerEntity = producerReponsiroty.findById(id);
        BaseResponse<List<ProducerDTO>> baseResponse;
        if (producerEntity.isEmpty()){
            baseResponse = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return baseResponse;
        }
        ProducerEntity producers = producerEntity.get();
        producers.setDeleted(true);
        producerReponsiroty.save(producers);

        List<ProducerEntity> producerEntities = producerReponsiroty.listProducer();
        List<ProducerDTO> producerDTOS = producerEntities.stream()
                .map(produce -> modelMapper.map(produce, ProducerDTO.class))
                .collect(Collectors.toList());
        baseResponse = new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, producerDTOS);

        return baseResponse;
    }

    @Override
    public BaseResponse<?> updateProducer(Long id, ProducerDTO producerDTO) {
        Optional<ProducerEntity> producerEntityOptional = producerReponsiroty.findById(id);
        if (producerEntityOptional.isEmpty()){
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);

        }
        ProducerEntity producers = producerEntityOptional.get();
        producers.setName(producerDTO.getName());
        producers.setCode(producerDTO.getCode());

        producerReponsiroty.save(producers);
        ProducerDTO producerDTO1 = modelMapper.map(producers, ProducerDTO.class);

        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, producerDTO1);
    }


}
