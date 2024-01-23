package edu.t3h.clothes.Controller.Users.ProductCheckout;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProductCheckoutController {
    @RequestMapping("user/productCheckout")
    public String productCheckout(){
        return "User/ProductCheckout/ProductCheckout";
    }
}
