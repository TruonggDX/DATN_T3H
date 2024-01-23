package edu.t3h.clothes.Controller.Auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthController {
    @RequestMapping("login")
    public String index(){
        return "/Auth/Login";
    }
    @RequestMapping("register")
    public String registers(){
        return "/Auth/Register";
    }
}
