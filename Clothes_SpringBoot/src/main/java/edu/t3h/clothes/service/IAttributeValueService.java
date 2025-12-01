package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.AttributeValueDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IAttributeValueService {

  ResponsePage<List<AttributeValueDto>> getAllAttributeValues(String value,Pageable pageable);

  BaseResponse<AttributeValueDto> createAttributeValue(AttributeValueDto attributeValueDto);

  BaseResponse<AttributeValueDto> updateAttributeValue(Long id,
      AttributeValueDto attributeValueDto);

  BaseResponse<AttributeValueDto> deleteAttributeValue(Long id);

  BaseResponse<AttributeValueDto> getAttributeValue(Long id);

  ResponsePage<List<AttributeValueDto>> findByCondition(String value, Long attributeId,
      Pageable pageable);

  BaseResponse<List<AttributeValueDto>> getAttributeValueByVariantId(Long variantId);
}
