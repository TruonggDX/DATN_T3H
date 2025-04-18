package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

  public CategoryDTO toDto(CategoryEntity categoryEntity) {
    CategoryDTO categoryDTO = new CategoryDTO();
    categoryDTO.setId(categoryEntity.getId());
    categoryDTO.setName(categoryEntity.getName());
    categoryDTO.setCode(categoryEntity.getCode());
    return categoryDTO;
  }

  public CategoryEntity toEntity(CategoryDTO categoryDTO) {
    CategoryEntity categoryEntity = new CategoryEntity();
    categoryEntity.setId(categoryDTO.getId());
    categoryEntity.setName(categoryDTO.getName());
    categoryEntity.setCode(categoryDTO.getCode());
    return categoryEntity;
  }
}
