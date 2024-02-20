package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CategoryEntity;
import jdk.jfr.Category;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Locale;

public interface CategoryService {
    List<CategoryEntity> getAll();
    Boolean creatCategory(CategoryEntity category);
    CategoryEntity findCategoryById(Integer id);
    Boolean updateCategory(CategoryEntity category);
    Boolean deleteCategory(Integer id);
    List<CategoryEntity> searchCategory(String keyword);

    Page<CategoryEntity> getAll(Integer pageNo);

}
