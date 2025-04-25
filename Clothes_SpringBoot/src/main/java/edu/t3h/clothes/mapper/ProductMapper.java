package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.dto.ProductDto;

public class ProductMapper {
  public ProductDto toDto(ProductEntity entity) {
    ProductDto dto = new ProductDto();
    dto.setId(entity.getId());
    dto.setCode(entity.getCode());
    dto.setName(entity.getName());
    dto.setDescription(entity.getDescription());
    dto.setCategory(entity.getCategoryEntity() != null ? entity.getCategoryEntity().getName() : null);
    dto.setProducer(entity.getBrandEntity() != null ? entity.getBrandEntity().getName() : null);
    dto.setCategoryId(entity.getCategoryEntity() != null ? entity.getCategoryEntity().getId() : null);
    dto.setProducerId(entity.getBrandEntity() != null ? entity.getBrandEntity().getId() : null);
    return dto;
  }
}
