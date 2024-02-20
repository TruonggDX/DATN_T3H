package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.repository.CategoryReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryImpl implements CategoryService{
    @Autowired
    private CategoryReponsitory categoryReponsitory;
    @Override
    public List<CategoryEntity> getAll() {
        return this.categoryReponsitory.findAll();
    }

    @Override
    public Boolean creatCategory(CategoryEntity category) {
        try {
           this.categoryReponsitory.save(category);
           return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public CategoryEntity findCategoryById(Integer id) {
        return this.categoryReponsitory.findById(id).get();
    }

    @Override
    public Boolean updateCategory(CategoryEntity category) {
        try {
            this.categoryReponsitory.save(category);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Boolean deleteCategory(Integer id) {
        try{
            this.categoryReponsitory.delete(findCategoryById(id));
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<CategoryEntity> searchCategory(String keyword) {
        return this.categoryReponsitory.searchCategory(keyword);
    }
}
