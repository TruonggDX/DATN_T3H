package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

  CategoryDto toDto(CategoryEntity categoryEntity);

  CategoryEntity toEntity(CategoryDto categoryDto);
}
