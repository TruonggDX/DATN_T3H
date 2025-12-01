package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.VariantEntity;
import edu.t3h.clothes.model.dto.VariantDto;
import edu.t3h.clothes.model.response.VariantResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VariantMapper {

  @Mapping(target = "productId", source = "productEntity.id")
  VariantDto toDto(VariantEntity variantEntity);

  VariantEntity toEntity(VariantDto dto);

  VariantResponse toResponse(VariantEntity variantEntity);
}
