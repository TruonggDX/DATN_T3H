package edu.t3h.clothes.controller.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthController {
    @GetMapping(value = {"/","/login"})
    public String loginPage(){
        return "/auth/login";
    }

}
