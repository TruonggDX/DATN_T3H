package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICategoryService {
    BaseResponse<List<CategoryDTO>> getAll();
    BaseResponse<?> creatCategory(CategoryDTO categoryDTO);
    BaseResponse<?> deleteCategory(Long id);
    CategoryDTO findCategoryById(Long id);
    BaseResponse<?> updateCategory(Long categoryId, CategoryDTO categoryDTO);
//    Boolean creatCategory(CategoryEntity category);
//    CategoryEntity findCategoryById(Integer id);
//    Boolean updateCategory(CategoryEntity category);
//    Boolean deleteCategory(Long id);
//    List<CategoryEntity> searchCategory(String keyword);
//
//    Page<CategoryEntity> getAll(Integer pageNo);

}
