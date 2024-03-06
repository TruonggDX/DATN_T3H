package edu.t3h.clothes.controller.resource;


import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/producer")
public class ProducerResource {

    private  final IProducerService producerService;
    public ProducerResource(IProducerService producerService){this.producerService = producerService;}

    @GetMapping("/list")
    public BaseResponse<List<ProducerDTO>> getAllProduceres(){
        BaseResponse<List<ProducerDTO>> response = producerService.getAll();
        return  response;
    }

    @PostMapping("/create")
    public BaseResponse<?> createProducer(@RequestBody ProducerDTO producerDTO){
        BaseResponse<?> response = producerService.creatProducer(producerDTO);
        return  response;
    }

    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteProducer(@PathVariable Long id){
        BaseResponse<?> response = producerService.deleteProducer(id);
        return response;
    }

    @PostMapping("/update/{id}")
    public BaseResponse<?> updateProducer(@PathVariable Long id, @RequestBody ProducerDTO producerDTO){
        BaseResponse<?> response = producerService.updateProducer(id, producerDTO);
        return response;
    }

    @GetMapping("search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id){
        ProducerDTO producerDTO = producerService.findByProducerById(id);
        if (producerDTO != null){
            List<ProducerDTO> producerDTOS = new ArrayList<>();
            producerDTOS.add(producerDTO);
            BaseResponse<List<ProducerDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(producerDTOS);
            return response;
        }else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }
}
