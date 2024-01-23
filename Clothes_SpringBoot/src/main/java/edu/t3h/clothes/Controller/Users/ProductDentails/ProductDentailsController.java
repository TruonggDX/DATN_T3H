package edu.t3h.clothes.Controller.Users.ProductDentails;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProductDentailsController {
    @RequestMapping("user/product_dentails")
    public String productDentails(){
        return "User/ProductDentails/ProductDentails";
    }
}
