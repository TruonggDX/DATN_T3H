package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AttributeValueEntity;
import edu.t3h.clothes.entity.VariantEntity;
import edu.t3h.clothes.mapper.AttributeValueMapper;
import edu.t3h.clothes.mapper.VariantMapper;
import edu.t3h.clothes.model.dto.VariantDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AttributeValueRepository;
import edu.t3h.clothes.repository.VariantRepository;
import edu.t3h.clothes.service.IVariantService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.List;
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
  private final AttributeValueMapper attributeValueMapper;
  private final AttributeValueRepository attributeValueRepository;

  @Override
  public ResponsePage<List<VariantDto>> getAllVariants(Pageable pageable) {
    ResponsePage<List<VariantDto>> responsePage = new ResponsePage<>();
    Page<VariantEntity> page = variantRepository.findAllByDeletedFalse(pageable);
//    List<VariantDto> variantDtos = page.getContent().stream().map(entity ->{
//      VariantDto variantDto = variantMapper.toDto(entity);
//
//      return variantDto;
//    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
//    responsePage.setContent(variantDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<VariantDto> createVariant(VariantDto variantDto) {
    BaseResponse<VariantDto> response = new BaseResponse<>();
    VariantEntity variantEntity = variantMapper.toEntity(variantDto);
    variantEntity.setDeleted(false);
    Set<AttributeValueEntity> attributeValueEntities = variantDto.getAttributeValuesId().stream()
        .map(paramId -> attributeValueRepository.findById(paramId)
            .orElseThrow(() -> new RuntimeException("Attribute value not found with ID: " + paramId)))
        .collect(Collectors.toSet());
    variantEntity.setAttributeValues(attributeValueEntities);
    variantRepository.save(variantEntity);
    response.setData(variantMapper.toDto(variantEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

}
