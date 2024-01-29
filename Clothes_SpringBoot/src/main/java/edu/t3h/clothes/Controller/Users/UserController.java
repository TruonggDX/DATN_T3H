package edu.t3h.clothes.Controller.Users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
//    @RequestMapping("/","/user")
    @GetMapping(value = {"/","/user"})
    public String index(){
        return "User/index";
    }

    @RequestMapping("user/contact")
    public String contact(){
        return "User/Contact/Contacts";
    }

    @RequestMapping("user/categroyshop")
    public String category(){
        return "User/CategoryShop/Category";
    }
    @RequestMapping("user/productCheckout")
    public String productCheckout(){
        return "User/ProductCheckout/ProductCheckout";
    }
    @RequestMapping("user/product_dentails")
    public String productDentails(){
        return "User/ProductDentails/ProductDentails";
    }
    @RequestMapping("user/cart")
    public String cart(){
        return "User/ShoppingCart/Cart";
    }
}
