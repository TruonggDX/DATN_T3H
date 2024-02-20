package edu.t3h.clothes.controller.admin;

import edu.t3h.clothes.entity.Producer;
import edu.t3h.clothes.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class ProducerController {
    @Autowired
    private ProducerService producerService;


    @GetMapping("/list_producer")
    public String index(Model model, @Param("keyword") String keyword){
        List<Producer> list = this.producerService.getAll();
        if (keyword!=null){
            list = this.producerService.searchProducer(keyword);
            model.addAttribute("keyword", keyword);
        }
        model.addAttribute("list", list);

        return "Admin/Producer/list_producer";
    }
//    public String index(Model model){
//        List<Producer> list = this.producerService.getAll();
//        model.addAttribute("list", list);
//        return "Admin/Producer/list_producer";
//    }

    @GetMapping("/add_producer")
    public String insert(Model model){
        Producer producer = new Producer();
        model.addAttribute("producer",producer);
        return "Admin/Producer/add_producer";
    }

    @PostMapping("/add_producer")
    public String save(@ModelAttribute("producer") Producer producer){
        if (this.producerService.creatProducer(producer)){
            return "redirect:/admin/list_producer";
        }else {
            return "Admin/Producer/add_producer";
        }
    }
    @GetMapping("/delete_producer/{id}")
    public String delete(@PathVariable("id") Integer id){
        if (this.producerService.deleteProducer(id)){
            return "redirect:/admin/list_producer";
        }else {
            return "Admin/Category/add_category";
        }
    }

    @GetMapping("/update_producer/{id}")
    public String update(Model model, @PathVariable("id") Integer id){
        Producer producer = this.producerService.findProducerById(id);
        model.addAttribute("producer", producer);
        return "Admin/Producer/update_producer";
    }
    @PostMapping("/update_producer")
    public String update(@ModelAttribute("producer") Producer producer){
        if (this.producerService.updateProducer(producer)){
            return "redirect:/admin/list_producer";
        }else {
            return "Admin/Producer/add_producer";
        }
    }
}
