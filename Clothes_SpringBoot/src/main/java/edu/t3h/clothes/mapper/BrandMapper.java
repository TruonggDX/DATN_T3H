package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.model.dto.BrandDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BrandMapper {

  @Mapping(target = "imageUrl", source = "image.url")
  BrandDto toDto(BrandEntity brandEntity);

  BrandEntity toEntity(BrandDto brandDto);
}
