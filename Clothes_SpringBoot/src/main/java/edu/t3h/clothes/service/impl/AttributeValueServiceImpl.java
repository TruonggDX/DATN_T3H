package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AttributeEntity;
import edu.t3h.clothes.entity.AttributeValueEntity;
import edu.t3h.clothes.mapper.AttributeValueMapper;
import edu.t3h.clothes.model.dto.AttributeValueDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AttributeRepository;
import edu.t3h.clothes.repository.AttributeValueRepository;
import edu.t3h.clothes.service.IAttributeValueService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttributeValueServiceImpl implements IAttributeValueService {

  private final AttributeValueRepository attributeValueRepository;
  private final AttributeValueMapper attributeValueMapper;
  private final AttributeRepository attributeRepository;

  @Override
  public ResponsePage<List<AttributeValueDto>> getAllAttributeValues(Pageable pageable) {
    ResponsePage<List<AttributeValueDto>> responsePage = new ResponsePage<>();
    Page<AttributeValueEntity> page = attributeValueRepository.findAllDeletedAttributes(pageable);
    List<AttributeValueDto> attributeValueDtos = page.getContent().stream()
        .map(attributeValueMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(attributeValueDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<AttributeValueDto> createAttributeValue(AttributeValueDto attributeValueDto) {
    BaseResponse<AttributeValueDto> response = new BaseResponse<>();
    Optional<AttributeEntity> check = attributeRepository.findById(
        attributeValueDto.getAttribute().getId());
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.FAILED);
      return response;
    }
    AttributeValueEntity attributeValueEntity = attributeValueMapper.toEntity(attributeValueDto);
    attributeValueEntity.setDeleted(false);
    attributeValueEntity.setAttribute(check.get());
    attributeValueRepository.save(attributeValueEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(attributeValueMapper.toDto(attributeValueEntity));
    return response;
  }

  @Override
  public BaseResponse<AttributeValueDto> updateAttributeValue(Long id,
      AttributeValueDto attributeValueDto) {
    BaseResponse<AttributeValueDto> response = new BaseResponse<>();
    Optional<AttributeValueEntity> check = attributeValueRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.FAILED);
      return response;
    }
    Optional<AttributeEntity> checkAttr = attributeRepository.findById(
        attributeValueDto.getAttribute().getId());
    if (checkAttr.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
      return response;
    }
    AttributeValueEntity attributeValueEntity = attributeValueMapper.toEntity(attributeValueDto);
    attributeValueEntity.setDeleted(false);
    attributeValueEntity.setAttribute(checkAttr.get());
    attributeValueEntity.setId(id);
    attributeValueRepository.save(attributeValueEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(attributeValueMapper.toDto(attributeValueEntity));
    return response;
  }

  @Override
  public BaseResponse<AttributeValueDto> deleteAttributeValue(Long id) {
    BaseResponse<AttributeValueDto> response = new BaseResponse<>();
    Optional<AttributeValueEntity> check = attributeValueRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    AttributeValueEntity attributeValueEntity = check.get();
    attributeValueEntity.setDeleted(true);
    attributeValueRepository.save(attributeValueEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(attributeValueMapper.toDto(attributeValueEntity));
    return response;
  }

  @Override
  public BaseResponse<AttributeValueDto> getAttributeValue(Long id) {
    BaseResponse<AttributeValueDto> response = new BaseResponse<>();
    Optional<AttributeValueEntity> check = attributeValueRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.FAILED);
      return response;
    }
    AttributeValueEntity attributeValueEntity = check.get();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(attributeValueMapper.toDto(attributeValueEntity));
    return response;
  }

  @Override
  public ResponsePage<List<AttributeValueDto>> findByCondition(String value, Long attributeId,
      Pageable pageable) {
    ResponsePage<List<AttributeValueDto>> responsePage = new ResponsePage<>();
    Page<AttributeValueEntity> page = attributeValueRepository.searchByCondition(value, attributeId,
        pageable);
    List<AttributeValueDto> attributeValueDtos = page.getContent().stream()
        .map(attributeValueMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(attributeValueDtos);
    return responsePage;
  }
}
