package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.CategoryDto;
import edu.t3h.clothes.model.dto.CategoryRevenueDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ICategoryService {

  ResponsePage<List<CategoryDto>> getAllCategories(String code, String name, Pageable pageable);

  BaseResponse<CategoryDto> creatCategory(CategoryDto categoryDTO);

  BaseResponse<CategoryDto> deleteCategory(Long id);

  BaseResponse<CategoryDto> findCategoryById(Long id);

  BaseResponse<CategoryDto> updateCategory(Long id, CategoryDto categoryDTO);

  BaseResponse<List<CategoryRevenueDTO>> getCategoryRevenue();
}
