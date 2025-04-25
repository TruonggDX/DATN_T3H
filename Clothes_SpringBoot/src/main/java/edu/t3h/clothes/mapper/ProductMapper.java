package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.dto.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

  @Mapping(target = "categoryId", source = "categoryEntity.id")
  @Mapping(target = "brandId", source = "brandEntity.id")
  ProductDto toDto(ProductEntity productEntity);

  ProductEntity toEntity(ProductDto productDto);
}
