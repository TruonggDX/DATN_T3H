package edu.t3h.clothes.Controller.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class CategoryController {
    @RequestMapping("admin/category")
    public String index(){
        return "Admin/Category/list_category";
    }
    @RequestMapping("admin/add_category")
        public String add(){
        return "Admin/Category/add_category";
        }
}
