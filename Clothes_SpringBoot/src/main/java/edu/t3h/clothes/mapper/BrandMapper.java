package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.model.dto.BrandDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BrandMapper {
  BrandDto toDto(BrandEntity brandEntity);
  BrandEntity toEntity(BrandDto brandDto);

  // Thêm method này để merge dto vào entity
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateEntityFromDto(BrandDto dto, @MappingTarget BrandEntity entity);
}
