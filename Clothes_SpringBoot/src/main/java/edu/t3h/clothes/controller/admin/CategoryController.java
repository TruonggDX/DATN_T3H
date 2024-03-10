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
    @GetMapping("/category")
    public String showDataCategories() {
        return "admin/category/list_category";
    }

    @GetMapping("/update_category")
    public String updateCategory() {
        return "admin/category/update_category";
    }

}