package edu.t3h.clothes.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
//@RequestMapping("/admin")
public class ColorController {
    @GetMapping("/admin/color")
    public String showData(){
        return "admin/color/list_color";
    }
    @GetMapping("/admin/update_color")
    public String updateColor(){
        return "admin/color/update_color";
    }
}