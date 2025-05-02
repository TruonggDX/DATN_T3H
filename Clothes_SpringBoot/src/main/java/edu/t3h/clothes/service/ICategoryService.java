package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.CategoryDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ICategoryService {

//  BaseResponse<List<CategoryDto>> getAllCategories();

  ResponsePage<List<CategoryDto>> getAllCategoriesByParentId(Pageable pageable);

  BaseResponse<CategoryDto> creatCategory(CategoryDto categoryDTO);

  BaseResponse<CategoryDto> deleteCategory(Long id);

  BaseResponse<CategoryDto> findCategoryById(Long id);

  BaseResponse<CategoryDto> updateCategory(Long id, CategoryDto categoryDTO);

  ResponsePage<List<CategoryDto>> searchCategoriesCondition(String name, Pageable pageable);

  BaseResponse<List<CategoryDto>> loadCategoriesByParentId(Long parentId);
}
