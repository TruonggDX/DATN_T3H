package edu.t3h.clothes.controller.admin;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/category")
    public String categorys(Model model, @Param("keyword") String keyword){
        List<CategoryEntity> list = this.categoryService.getAll();
        if (keyword!=null){
            list = this.categoryService.searchCategory(keyword);
            model.addAttribute("keyword", keyword);
        }
        model.addAttribute("list", list);

        return "Admin/Category/list_category";
    }

//    @GetMapping("/category")
//    public String categorys(Model model){
//        List<Category> list = this.categoryService.getAll();
//        model.addAttribute("list", list);
//
//        return "Admin/Category/list_category";
//    }

    @GetMapping("/add_category")
    public String add(Model model){
        CategoryEntity category = new CategoryEntity();
        model.addAttribute("category",category);
        return "Admin/Category/add_category";
    }
    @PostMapping("/add_category")
    public String save(@ModelAttribute("category") CategoryEntity category){
        if (this.categoryService.creatCategory(category)){
            return "redirect:/admin/category";
        }else {
            return "Admin/Category/add_category";
        }
    }
    @GetMapping("/update_category/{id}")
    public String update(Model model, @PathVariable("id") Integer id){
        CategoryEntity category = this.categoryService.findCategoryById(id);
        model.addAttribute("category", category);
        return "Admin/Category/update_category";
    }
    @PostMapping("/update_category")
    public String update(@ModelAttribute("category") CategoryEntity category){
        if (this.categoryService.creatCategory(category)){
            return "redirect:/admin/category";
        }else {
            return "Admin/Category/add_category";
        }
    }

    @GetMapping("/delete_category/{id}")
    public String delete(@PathVariable("id") Integer id){
        if (this.categoryService.deleteCategory(id)){
            return "redirect:/admin/category";
        }else {
            return "Admin/Category/add_category";
        }
    }
}
