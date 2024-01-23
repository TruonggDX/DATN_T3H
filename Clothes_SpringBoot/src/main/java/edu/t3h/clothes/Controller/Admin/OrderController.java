package edu.t3h.clothes.Controller.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {
    @RequestMapping("admin/list_order")
    public String index(){
        return "/Admin/Order/list_order";
    }
    @RequestMapping("admin/add_order")
    public String addOrder(){
        return "/Admin/Order/add_order";
    }
}
