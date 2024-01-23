package edu.t3h.clothes.Controller.Users.CategoryShop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CategoryShopController {
    @RequestMapping("user/categryshop")
    public String index(){
        return "User/CategoryShop/Category";
    }
}
