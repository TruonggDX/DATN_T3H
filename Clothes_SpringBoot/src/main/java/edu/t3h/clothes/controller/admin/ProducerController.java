package edu.t3h.clothes.controller.admin;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class ProducerController {

    @GetMapping("/producer")
    public String showData(){
        return "admin/producer/list_producer";
    }
    @GetMapping("/update_producer")
    public String updateProducer(){
        return "admin/producer/update_producer";
    }
}
