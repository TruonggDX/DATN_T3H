package edu.t3h.clothes.service.impl;


import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.mapper.ProducerMapper;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.ProducerRepository;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.GenarateCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ProducerImpl implements IProducerService {
    @Autowired
    private ProducerRepository producerRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProducerMapper producerMapper;

    @Override
    public BaseResponse<Page<ProducerDTO>> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProducerEntity> pages = producerRepository.listProducer(pageable);

        List<ProducerDTO> producerdto = pages.getContent().stream()
                .map(producerEntity -> modelMapper.map(producerEntity, ProducerDTO.class))
            .toList();

        BaseResponse<Page<ProducerDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(new PageImpl<>(producerdto, pageable, pages.getTotalElements()));
        return response;
    }

    @Override
    public BaseResponse<?> creatProducer(ProducerDTO producerDTO) {
        ProducerEntity producerEntity = producerMapper.toEntity(producerDTO);
        producerEntity.setDeleted(false);
        producerEntity.setCreatedDate(LocalDateTime.now());
        producerEntity.setCode(GenarateCode.generateAccountCode());
        producerEntity = producerRepository.save(producerEntity);
        producerDTO = producerMapper.toDto(producerEntity);
        BaseResponse<ProducerDTO> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(producerDTO);
        return response;
    }

    @Override
    public ProducerDTO findByProducerById(Long id) {
        Optional<ProducerEntity> producerEntityOptional = producerRepository.findById(id);
        ProducerEntity producerEntity = null;
        BaseResponse<ProducerDTO> response;

        if (producerEntityOptional.isEmpty()){
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ProducerDTO.class);
        }
        producerEntity = producerEntityOptional.get();
        if (producerEntity.getDeleted()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(),
                Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ProducerDTO.class);
        }
        return modelMapper.map(producerEntity, ProducerDTO.class);
    }

    @Override
    public BaseResponse<?> deleteProducer(Long id) {
        Optional<ProducerEntity> producerEntity = producerRepository.findById(id);
        BaseResponse<List<ProducerDTO>> baseResponse;
        if (producerEntity.isEmpty()){
            baseResponse = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return baseResponse;
        }
        ProducerEntity producers = producerEntity.get();
        producers.setDeleted(true);
        producerRepository.save(producers);

        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, null);
    }

    @Override
    public BaseResponse<?> updateProducer(Long id, ProducerDTO producerDTO) {
        Optional<ProducerEntity> producerEntityOptional = producerRepository.findById(id);
        if (producerEntityOptional.isEmpty()){
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);

        }
        ProducerEntity producers = producerEntityOptional.get();
        producers.setName(producerDTO.getName());
        producers.setCode(producerDTO.getCode());

        producerRepository.save(producers);
        ProducerDTO producerDTO1 = modelMapper.map(producers, ProducerDTO.class);

        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, producerDTO1);
    }

    @Override
    public BaseResponse<Page<ProducerDTO>> searchProducerByCondition(String condition, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProducerEntity> pages = producerRepository.searchProducer(condition, pageable);
        Page<ProducerDTO> prodto = pages.map(userEntity -> {
            ProducerDTO producerDTO = modelMapper.map(userEntity, ProducerDTO.class);
            return producerDTO;
        });
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, prodto);
    }



}
