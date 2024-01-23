package edu.t3h.clothes.Controller.Users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
    @RequestMapping("/user")
    public String index(){
        return "User/index";
    }
}
