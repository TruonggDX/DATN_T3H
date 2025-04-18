package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ICategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class CategoryShopResource {
    private final ICategoryService categoryService;
    public  CategoryShopResource(ICategoryService categoryService){
        this.categoryService = categoryService;
    }
//    @GetMapping("/shop")
//    public BaseResponse<List<CategoryDTO>> getAllCategories() {
//        BaseResponse<List<CategoryDTO>> response = categoryService.getAll();
//        return response;
//    }
}
