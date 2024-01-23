package edu.t3h.clothes.Controller.Users.Contact;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ContactController {
    @RequestMapping("user/contact")
    public String contact(){
        return "User/Contact/Contacts";
    }
}
