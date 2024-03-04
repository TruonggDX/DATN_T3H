package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ICategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryResource {
    private final ICategoryService categoryService;
    public  CategoryResource(ICategoryService categoryService){
        this.categoryService = categoryService;
    }
    @GetMapping("/list_category")
    public BaseResponse<List<CategoryDTO>> getAllCategories() {
        BaseResponse<List<CategoryDTO>> response = categoryService.getAll();
        return response;
    }
    @PostMapping("/create")
    public BaseResponse<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        BaseResponse<?> response = categoryService.creatCategory(categoryDTO);
        return response;
    }
    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteCategory(@PathVariable Long id) {
        BaseResponse<?> response = categoryService.deleteCategory(id);
        return response;
    }
    @PostMapping("update/{id}")
    public BaseResponse<?> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        BaseResponse<?> response = categoryService.updateCategory(id, categoryDTO);
        return response;
    }
//    @GetMapping("search/{id}")
//    public ResponseEntity<?> getId(@PathVariable Long id) {
//        CategoryDTO categoryDTO = categoryService.findCategoryById(id);
//        if (categoryDTO != null) {
//            return ResponseEntity.ok(categoryDTO);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }


}
