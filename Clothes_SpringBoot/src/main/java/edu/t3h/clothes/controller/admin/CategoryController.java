package edu.t3h.clothes.controller.admin;

import edu.t3h.clothes.controller.resource.CategoryResource;
import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private CategoryResource categoryResource;
    @GetMapping("/category")
    public String show(Model model) {
        BaseResponse<List<CategoryDTO>> categories = categoryService.getAll();
        model.addAttribute("categories", categories);
        return "Admin/Category/list_category";
    }
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        BaseResponse<?> baseResponse = categoryService.deleteCategory(id);
        if (baseResponse.getCode() == HttpStatus.OK.value()){
            return "redirect:/admin/category";
        }
        return "redirect:/admin/category";
    }
    @PostMapping("/add_category")
    public String creatCategory(@ModelAttribute("categoryDTO") CategoryDTO categoryDTO) {
        BaseResponse<?> categoryResponse = categoryService.creatCategory(categoryDTO);
        if (categoryResponse.getCode() == HttpStatus.OK.value()) {
            return "redirect:/admin/category";
        } else {
            return "Admin/Category/add_category";
        }
    }
    @GetMapping("/update_category/{id}")
    public String updates(@PathVariable Long id, Model model) {
        CategoryDTO categoryDTO = categoryService.findCategoryById(id);
        model.addAttribute("categoryDTO", categoryDTO);
        return "Admin/Category/update_category";
    }

    @PostMapping("/update_category")
    public String updateCategory(@ModelAttribute("categoryDTO") CategoryDTO categoryDTO) {
        categoryService.updateCategory(categoryDTO.getId(), categoryDTO);
        return "redirect:/admin/category";
    }
    @GetMapping("/search/{id}")
    public String search(@PathVariable Long id,Model model) {
        BaseResponse<?> categories = categoryResource.getId(id);
        if (categories.getCode() == HttpStatus.OK.value()){
            model.addAttribute("categories", categories);
            return "Admin/Category/list_category";
        }
        return "Admin/Category/update_category";
    }


}