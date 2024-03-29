package edu.t3h.clothes.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ProductController {
    @GetMapping("/list")
    public String products(){
        return "admin/product/list_product";
    }
    @GetMapping("/add_product")
    public String addProduct(){
        return "admin/product/add_product";
    }
    @GetMapping("/update_product")
    public String updateProduct(){
        return "admin/product/update_product";
    }
}
