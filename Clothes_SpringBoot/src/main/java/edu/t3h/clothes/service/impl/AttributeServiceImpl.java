package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AttributeEntity;
import edu.t3h.clothes.mapper.AttributeMapper;
import edu.t3h.clothes.model.dto.AttributeDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AttributeRepository;
import edu.t3h.clothes.service.IAttributeService;
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
public class AttributeServiceImpl implements IAttributeService {

  private final AttributeRepository attributeRepository;
  private final AttributeMapper attributeMapper;

  @Override
  public ResponsePage<List<AttributeDto>> getAllAttributes(Pageable pageable) {
    ResponsePage<List<AttributeDto>> responsePage = new ResponsePage<>();
    Page<AttributeEntity> page = attributeRepository.findAllByDeletedFalse(pageable);
    List<AttributeDto> attributeDtos = page.getContent().stream().map(attributeMapper::toDto)
        .toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(attributeDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<AttributeDto> createAttribute(AttributeDto attributeDto) {
    BaseResponse<AttributeDto> response = new BaseResponse<>();
    AttributeEntity attributeEntity = attributeMapper.toEntity(attributeDto);
    attributeEntity.setDeleted(false);
    attributeRepository.save(attributeEntity);
    response.setData(attributeMapper.toDto(attributeEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<AttributeDto> updateAttribute(Long id, AttributeDto attributeDto) {
    BaseResponse<AttributeDto> response = new BaseResponse<>();
    Optional<AttributeEntity> check = attributeRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    AttributeEntity attributeEntity = check.get();
    response.setData(attributeMapper.toDto(attributeEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<AttributeDto> deleteAttribute(Long id) {
    BaseResponse<AttributeDto> response = new BaseResponse<>();
    Optional<AttributeEntity> check = attributeRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    AttributeEntity attributeEntity = check.get();
    attributeEntity.setDeleted(true);
    attributeRepository.save(attributeEntity);
    response.setData(attributeMapper.toDto(attributeEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<AttributeDto> getAttribute(Long id) {
    BaseResponse<AttributeDto> response = new BaseResponse<>();
    Optional<AttributeEntity> check = attributeRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    AttributeDto attributeDto = attributeMapper.toDto(check.get());
    response.setData(attributeDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<List<AttributeDto>> findByName(String name) {
    BaseResponse<List<AttributeDto>> response = new BaseResponse<>();
    List<AttributeEntity> attributeEntities = attributeRepository.findByName(name);
    List<AttributeDto> attributeDtos = attributeEntities.stream().map(attributeMapper::toDto)
        .toList();
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    response.setData(attributeDtos);
    return response;
  }
}
