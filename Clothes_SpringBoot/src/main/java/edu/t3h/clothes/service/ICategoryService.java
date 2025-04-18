package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

public interface ICategoryService {

  BaseResponse<Page<CategoryDTO>> getAll(int page, int size);

  BaseResponse<CategoryDTO> creatCategory(CategoryDTO categoryDTO);

  BaseResponse<CategoryDTO> deleteCategory(Long id);

  BaseResponse<CategoryDTO> findCategoryById(Long id);

  BaseResponse<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDTO);

  BaseResponse<Page<CategoryDTO>> searchCategoriesCondition(String condition, int page, int size);


}
