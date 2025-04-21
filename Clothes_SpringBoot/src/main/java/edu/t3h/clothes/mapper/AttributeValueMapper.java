package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.AttributeValueEntity;
import edu.t3h.clothes.model.dto.AttributeValueDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AttributeValueMapper {

  @Mapping(target = "attribute", source = "attribute")
  AttributeValueDto toDto(AttributeValueEntity attributeValueEntity);

  AttributeValueEntity toEntity(AttributeValueDto attributeValueDto);
}
