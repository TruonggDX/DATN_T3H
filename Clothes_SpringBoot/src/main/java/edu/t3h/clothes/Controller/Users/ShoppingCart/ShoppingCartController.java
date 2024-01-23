package edu.t3h.clothes.Controller.Users.ShoppingCart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ShoppingCartController {
    @RequestMapping("user/cart")
    public String cart(){
        return "User/ShoppingCart/Cart";
    }
}
