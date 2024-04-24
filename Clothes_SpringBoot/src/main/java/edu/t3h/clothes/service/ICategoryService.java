package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ICategoryService {
    BaseResponse<Page<CategoryDTO>> getAll(int page, int size);
    BaseResponse<?> creatCategory(CategoryDTO categoryDTO);
    BaseResponse<?> deleteCategory(Long id);
    CategoryDTO findCategoryById(Long id);
    BaseResponse<?> updateCategory(Long id, CategoryDTO categoryDTO);


    BaseResponse<Page<CategoryDTO>> searchCategoriesCondition(String condition, int page, int size);


}
