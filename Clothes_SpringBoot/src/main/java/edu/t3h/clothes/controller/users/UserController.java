package edu.t3h.clothes.controller.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
    @RequestMapping("/user")
    public String index(){
        return "user/index";
    }

    @RequestMapping("/user/profile")
    public String profile(){
        return "user/profileUser";
    }

    @RequestMapping("user/contact")
    public String contact(){
        return "user/Contact/Contacts";
    }

    @RequestMapping("user/categroyshop")
    public String category(){
        return "user/categoryshop/Category";
    }
    @RequestMapping("user/productCheckout")
    public String productCheckout(){
        return "user/ProductCheckout/ProductCheckout";
    }
    @RequestMapping("user/product_dentails")
    public String productDentails(){
        return "user/ProductDentails/ProductDentails";
    }
    @RequestMapping("user/cart")
    public String cart(){
        return "user/ShoppingCart/Cart";
    }
}
