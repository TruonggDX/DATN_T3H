package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.ImageProductDTO;
import edu.t3h.clothes.model.request.ProductImageFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IImageProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/images/")
public class ImageProductResource {
    @Autowired
    private IImageProductService service;
    @PostMapping("/findByProductId")
    public ResponseEntity<BaseResponse<ImageProductDTO>> findByProductId(@RequestBody ProductImageFilterRequest filterRequest) {
        BaseResponse<ImageProductDTO> response = service.findByProductId(filterRequest);
        HttpStatus status = HttpStatus.valueOf(response.getCode());
        return new ResponseEntity<>(response, status);
    }
}
