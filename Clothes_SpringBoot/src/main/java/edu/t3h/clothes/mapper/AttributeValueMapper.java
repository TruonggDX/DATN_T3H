package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.AttributeValueEntity;
import edu.t3h.clothes.model.dto.AttributeValueDto;
import edu.t3h.clothes.model.response.AttributeValuesResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttributeValueMapper {

  @Mapping(target = "attributeId", source = "attribute.id")
  AttributeValueDto toDto(AttributeValueEntity attributeValueEntity);

  AttributeValueEntity toEntity(AttributeValueDto attributeValueDto);

  AttributeValuesResponse toResponse(AttributeValueEntity valueEntity);
}
