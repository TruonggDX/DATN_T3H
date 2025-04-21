package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.VariantEntity;
import edu.t3h.clothes.model.dto.VariantDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VariantMapper {

  VariantDto toDto(VariantEntity variantEntity);

  VariantEntity toEntity(VariantDto dto);
}
