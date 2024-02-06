package edu.t3h.clothes.Service;

import edu.t3h.clothes.Entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Boolean creatCategory(Category category);
    Category findCategoryById(Integer id);
    Boolean updateCategory(Category category);
    Boolean deleteCategory(Integer id);
    List<Category> searchCategory(String keyword);
}
