package edu.t3h.clothes.Controller.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProductController {
    @RequestMapping("admin/list_product")
    public String index(){
        return "Admin/Product/list_product";
    }
    @RequestMapping("admin/add_product")
    public String addProduct(){
        return "Admin/Product/add_product";
    }

}
