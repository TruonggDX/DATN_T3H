package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CategoryEntity;

import java.util.List;

public interface CategoryService {
    List<CategoryEntity> getAll();
    Boolean creatCategory(CategoryEntity category);
    CategoryEntity findCategoryById(Integer id);
    Boolean updateCategory(CategoryEntity category);
    Boolean deleteCategory(Integer id);
    List<CategoryEntity> searchCategory(String keyword);
}
