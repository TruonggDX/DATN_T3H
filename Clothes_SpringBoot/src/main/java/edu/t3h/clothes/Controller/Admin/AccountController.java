package edu.t3h.clothes.Controller.Admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AccountController {
    @RequestMapping ("/admin/add_account")
    public String index (){
        return "Admin/Account/add_account";
    }

    @RequestMapping ("admin/list_account")
    public String indexs(){
        return "Admin/Account/list_account";
    }

}
