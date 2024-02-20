package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Boolean creatCategory(Category category);
    Category findCategoryById(Integer id);
    Boolean updateCategory(Category category);
    Boolean deleteCategory(Integer id);
    List<Category> searchCategory(String keyword);
}
