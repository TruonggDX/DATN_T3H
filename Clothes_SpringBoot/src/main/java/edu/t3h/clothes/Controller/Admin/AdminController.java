package edu.t3h.clothes.Controller.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {
    @RequestMapping("/admin")
    public String admin(){
        return "Admin/index";
    }

    @RequestMapping ("/admin/add_account")
    public String index (){
        return "Admin/Account/add_account";
    }

    @RequestMapping ("admin/list_account")
    public String indexs(){
        return "Admin/Account/list_account";
    }
    @RequestMapping("admin/category")
    public String categorys(){
        return "Admin/Category/list_category";
    }
    @RequestMapping("admin/add_category")
    public String add(){
        return "Admin/Category/add_category";
    }
    @RequestMapping("admin/list_order")
    public String orders(){
        return "/Admin/Order/list_order";
    }
    @RequestMapping("admin/add_order")
    public String addOrder(){
        return "/Admin/Order/add_order";
    }
    @RequestMapping("admin/list_product")
    public String products(){
        return "Admin/Product/list_product";
    }
    @RequestMapping("admin/add_product")
    public String addProduct(){
        return "Admin/Product/add_product";
    }

}
