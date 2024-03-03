package edu.t3h.clothes.controller.admin;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;
    @GetMapping("/category")
    public String showCategoryView(Model model) {
        BaseResponse<List<CategoryDTO>> categories = categoryService.getAll();
        model.addAttribute("categories", categories);
        return "Admin/Category/list_category";
    }
    @GetMapping("/delete/{id}")
        public String delete(@PathVariable("id") Long id){
        BaseResponse<?> baseResponse = categoryService.deleteCategory(id);
        if (baseResponse.getCode() == HttpStatus.OK.value()){
            return "redirect:/admin/category";
        }
        return "redirect:/admin/category";
    }

}
