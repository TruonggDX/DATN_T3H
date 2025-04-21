package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.AttributeDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IAttributeService {
  ResponsePage<List<AttributeDto>> getAllAttributes(Pageable pageable);
  BaseResponse<AttributeDto> createAttribute(AttributeDto attributeDto);
  BaseResponse<AttributeDto> updateAttribute(Long id,AttributeDto attributeDto);
  BaseResponse<AttributeDto> deleteAttribute(Long id);
  BaseResponse<AttributeDto> getAttribute(Long id);
  BaseResponse<List<AttributeDto>> findByName(String name);
}
