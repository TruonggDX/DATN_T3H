package edu.t3h.clothes.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller

public class OrderController {
    @RequestMapping("/admin/order")
    public String showData(){
        return "admin/order/list_order";
    }
    @RequestMapping("/admin/update_order")
    public String updateOrder(){
        return "/admin/order/update_order";
    }
}
