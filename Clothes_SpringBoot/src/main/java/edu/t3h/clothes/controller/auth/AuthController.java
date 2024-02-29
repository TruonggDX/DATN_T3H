package edu.t3h.clothes.controller.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthController {
//    @RequestMapping("login")
//    public String index(){
//        return "/Auth/Login";
//    }

    @GetMapping(value = {"/","/login"})
    public String loginPage(){
        return "/Auth/Login";
    }

    @RequestMapping("register")
    public String registers(){
        return "/Auth/Register";
    }
}