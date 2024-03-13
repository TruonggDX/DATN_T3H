package edu.t3h.clothes.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class RoleController {
    @GetMapping("/role")
    public String showData(){
        return "admin/role/list_role";
    }
    @GetMapping("/update_role")
    public String updateColor(){
        return "admin/role/update_role";
    }
}
