package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.CategoryDto;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

public interface ICategoryService {

  BaseResponse<Page<CategoryDto>> getAll(int page, int size);

  BaseResponse<CategoryDto> creatCategory(CategoryDto categoryDTO);

  BaseResponse<CategoryDto> deleteCategory(Long id);

  BaseResponse<CategoryDto> findCategoryById(Long id);

  BaseResponse<CategoryDto> updateCategory(Long id, CategoryDto categoryDTO);

  BaseResponse<Page<CategoryDto>> searchCategoriesCondition(String condition, int page, int size);


}
