package edu.t3h.clothes.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/product")
public class ProductController {
    @RequestMapping("/list_product")
    public String products(){
        return "admin/product/list_product";
    }
    @RequestMapping("/add_product")
    public String addProduct(){
        return "admin/product/add_product";
    }
}
