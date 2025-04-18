package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDto;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

  public CategoryDto toDto(CategoryEntity categoryEntity) {
    CategoryDto categoryDTO = new CategoryDto();
    categoryDTO.setId(categoryEntity.getId());
    categoryDTO.setName(categoryEntity.getName());
    categoryDTO.setCode(categoryEntity.getCode());
    return categoryDTO;
  }

  public CategoryEntity toEntity(CategoryDto categoryDTO) {
    CategoryEntity categoryEntity = new CategoryEntity();
    categoryEntity.setId(categoryDTO.getId());
    categoryEntity.setName(categoryDTO.getName());
    categoryEntity.setCode(categoryDTO.getCode());
    return categoryEntity;
  }
}
