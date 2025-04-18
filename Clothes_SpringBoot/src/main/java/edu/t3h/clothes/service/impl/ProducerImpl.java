package edu.t3h.clothes.service.impl;


import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.mapper.ProducerMapper;
import edu.t3h.clothes.model.dto.ProducerDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.ProducerRepository;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProducerImpl implements IProducerService {

  private final ProducerRepository producerRepository;
  private final ProducerMapper producerMapper;


  @Override
  public ResponsePage<List<ProducerDto>> getAll(Pageable pageable) {
    ResponsePage<List<ProducerDto>> responsePage = new ResponsePage<>();
    Page<ProducerEntity> page = producerRepository.listProducer(pageable);
    List<ProducerDto> producerDTOS = page.getContent().stream().map(producerMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(producerDTOS);
    return responsePage;
  }

  @Override
  public BaseResponse<ProducerDto> creatProducer(ProducerDto producerDTO) {
    ProducerEntity producerEntity = producerMapper.toEntity(producerDTO);
    producerEntity.setDeleted(false);
    producerEntity.setCreatedDate(LocalDateTime.now());
    producerEntity.setCode(GenarateCode.generateAccountCode());
    producerEntity = producerRepository.save(producerEntity);
    producerDTO = producerMapper.toDto(producerEntity);
    BaseResponse<ProducerDto> response = new BaseResponse<>();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(producerDTO);
    return response;
  }

  @Override
  public BaseResponse<ProducerDto> findByProducerById(Long id) {
    BaseResponse<ProducerDto> response = new BaseResponse<>();
    Optional<ProducerEntity> check = producerRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProducerDto producerDTO = producerMapper.toDto(check.get());
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(producerDTO);
    return response;
  }

  @Override
  public BaseResponse<ProducerDto> deleteProducer(Long id) {
    BaseResponse<ProducerDto> response = new BaseResponse<>();
    Optional<ProducerEntity> check = producerRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProducerEntity producer = check.get();
    producer.setDeleted(true);
    producerRepository.save(producer);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(producerMapper.toDto(producer));
    return response;
  }

  @Override
  public BaseResponse<ProducerDto> updateProducer(Long id, ProducerDto producerDTO) {
    BaseResponse<ProducerDto> response = new BaseResponse<>();
    Optional<ProducerEntity> check = producerRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProducerEntity producer = check.get();
    producer.setId(id);
    producerRepository.save(producer);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(producerMapper.toDto(producer));
    return response;
  }

  @Override
  public BaseResponse<Page<ProducerDto>> searchProducerByCondition(String condition, int page,
      int size) {
    BaseResponse<Page<ProducerDto>> response = new BaseResponse<>();
    Pageable pageable = PageRequest.of(page, size);
    Page<ProducerEntity> pages = producerRepository.searchProducer(condition, pageable);
    Page<ProducerDto> prodto = pages.map(producerMapper::toDto);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(prodto);
    return response;
  }


}
