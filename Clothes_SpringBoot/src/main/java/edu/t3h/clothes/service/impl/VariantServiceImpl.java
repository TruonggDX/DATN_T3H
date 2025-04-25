package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AttributeValueEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VariantEntity;
import edu.t3h.clothes.mapper.VariantMapper;
import edu.t3h.clothes.model.dto.VariantDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AttributeValueRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.VariantRepository;
import edu.t3h.clothes.service.IVariantService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VariantServiceImpl implements IVariantService {

  private final VariantRepository variantRepository;
  private final VariantMapper variantMapper;
  private final AttributeValueRepository attributeValueRepository;
  private final ProductRepository productRepository;

  @Override
  public ResponsePage<List<VariantDto>> getAllVariants(Pageable pageable) {
    ResponsePage<List<VariantDto>> responsePage = new ResponsePage<>();
    Page<VariantEntity> page = variantRepository.findAllByDeletedFalse(pageable);
    List<VariantDto> variantDtos = page.getContent().stream().map(entity -> {
      VariantDto variantDto = variantMapper.toDto(entity);
      Set<Long> attributeValuesId = entity.getAttributeValues().stream()
          .map(AttributeValueEntity::getId).collect(Collectors.toSet());
      variantDto.setAttributeValuesId(attributeValuesId);
      return variantDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(variantDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<VariantDto> createVariant(VariantDto variantDto) {
    BaseResponse<VariantDto> response = new BaseResponse<>();
    VariantEntity variantEntity = variantMapper.toEntity(variantDto);
    Optional<ProductEntity> productEntity = productRepository.findById(variantDto.getProductId());
    if (productEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    variantEntity.setProductEntity(productEntity.get());
    variantEntity.setDeleted(false);
    Set<AttributeValueEntity> attributeValueEntities = variantDto.getAttributeValuesId().stream()
        .map(paramId -> attributeValueRepository.findById(paramId).orElseThrow(
            () -> new RuntimeException("Attribute value not found with ID: " + paramId)))
        .collect(Collectors.toSet());
    variantEntity.setAttributeValues(attributeValueEntities);
    variantRepository.save(variantEntity);
    variantDto = variantMapper.toDto(variantEntity);
    Set<Long> attributeValuesId = showAttributeValueId(attributeValueEntities);
    variantDto.setAttributeValuesId(attributeValuesId);
    response.setData(variantDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<VariantDto> updateVariant(Long id, VariantDto variantDto) {
    BaseResponse<VariantDto> response = new BaseResponse<>();
    Optional<VariantEntity> variantEntity = variantRepository.findById(id);
    if (variantEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    Optional<ProductEntity> productEntity = productRepository.findById(variantDto.getProductId());
    if (productEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VariantEntity variantEntity1 = variantMapper.toEntity(variantDto);
    variantEntity1.setId(id);
    variantEntity1.setDeleted(false);
    variantEntity1.setProductEntity(productEntity.get());
    Set<AttributeValueEntity> attributeValueEntities = new HashSet<>();
    for (Long ids : variantDto.getAttributeValuesId()) {
      AttributeValueEntity valueEntity = attributeValueRepository.findById(ids).orElseThrow();
      if (valueEntity != null) {
        attributeValueEntities.add(valueEntity);
      }
    }
    variantEntity1.setAttributeValues(attributeValueEntities);
    variantRepository.save(variantEntity1);
    variantDto = variantMapper.toDto(variantEntity1);
    Set<Long> attributeValuesId = showAttributeValueId(attributeValueEntities);
    variantDto.setAttributeValuesId(attributeValuesId);
    response.setData(variantDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<VariantDto> deleteVariant(Long id) {
    BaseResponse<VariantDto> response = new BaseResponse<>();
    Optional<VariantEntity> variantEntity = variantRepository.findById(id);
    if (variantEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VariantEntity variantEntity1 = variantEntity.get();
    variantEntity1.setDeleted(true);
    variantRepository.save(variantEntity1);
    VariantDto variantDto = variantMapper.toDto(variantEntity1);
    Set<Long> ids = variantEntity1.getAttributeValues().stream().map(AttributeValueEntity::getId)
        .collect(Collectors.toSet());
    variantDto.setAttributeValuesId(ids);
    response.setData(variantDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<VariantDto> getVariantById(Long id) {
    BaseResponse<VariantDto> response = new BaseResponse<>();
    Optional<VariantEntity> variant = variantRepository.findById(id);
    if (variant.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VariantEntity variantEntity = variant.get();
    VariantDto variantDto = variantMapper.toDto(variantEntity);
    Set<Long> attributeValuesId = showAttributeValueId(variantEntity.getAttributeValues());
    variantDto.setAttributeValuesId(attributeValuesId);
    response.setData(variantDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<List<VariantDto>> getAllVariantsByCodeAndProductName(String code,
      String productName, Pageable pageable) {
    ResponsePage<List<VariantDto>> responsePage = new ResponsePage<>();
    Page<VariantEntity> page = variantRepository.findAllByCodeAndProductName(code, productName,
        pageable);
    List<VariantDto> variantDtos = page.getContent().stream().map(entity -> {
      VariantDto variantDto = variantMapper.toDto(entity);
      Set<Long> attributeValuesId = showAttributeValueId(entity.getAttributeValues());
      variantDto.setAttributeValuesId(attributeValuesId);
      return variantDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(variantDtos);
    return responsePage;
  }

  private Set<Long> showAttributeValueId(Set<AttributeValueEntity> attributeValues) {
    return attributeValues.stream().map(AttributeValueEntity::getId).collect(Collectors.toSet());
  }

}
