package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.AttributeValueEntity;
import edu.t3h.clothes.model.dto.AttributeValueDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttributeValueMapper {

  AttributeValueDto toDto(AttributeValueEntity attributeValueEntity);

  AttributeValueEntity toEntity(AttributeValueDto attributeValueDto);
}
