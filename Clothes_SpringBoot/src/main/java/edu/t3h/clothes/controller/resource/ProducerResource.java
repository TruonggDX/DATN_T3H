package edu.t3h.clothes.controller.resource;


import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/producer")
public class ProducerResource {

    private  final IProducerService producerService;
    public ProducerResource(IProducerService producerService){this.producerService = producerService;}

    @GetMapping("/list")
    public ResponseEntity<BaseResponse<Page<ProducerDTO>>> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

        return ResponseEntity.ok(producerService.getAll(page, size));
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
    public BaseResponse<?> getId(@PathVariable Long id) {
        ProducerDTO producerDTO = producerService.findByProducerById(id);
        if (producerDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,producerDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
    }
    @GetMapping("/searchByCondition/{condition}")
    public BaseResponse<Page<ProducerDTO>> searchUsersByCondition(@PathVariable String condition,
                                                                  @RequestParam(name = "page", required = false, defaultValue = "0") int page,
                                                                  @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

        BaseResponse<Page<ProducerDTO>> prodto = producerService.searchProducerByCondition(condition, page, size);
        if (prodto.getData() != null && !prodto.getData().isEmpty()) {
            BaseResponse<Page<ProducerDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(prodto.getData());
            return response;
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }
}
