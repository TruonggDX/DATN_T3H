package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.AttributeEntity;
import edu.t3h.clothes.model.dto.AttributeDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttributeMapper {

  AttributeDto toDto(AttributeEntity attributeEntity);

  AttributeEntity toEntity(AttributeDto attributeDto);
}
