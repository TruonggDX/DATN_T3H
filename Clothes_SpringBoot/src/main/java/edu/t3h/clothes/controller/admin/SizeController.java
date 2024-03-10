package edu.t3h.clothes.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class SizeController {
    @GetMapping("/size")
    public String showData(){
        return "admin/size/list_size";
    }
    @GetMapping("/update_size")
    public String updateColor(){
        return "admin/size/update_size";
    }
}
