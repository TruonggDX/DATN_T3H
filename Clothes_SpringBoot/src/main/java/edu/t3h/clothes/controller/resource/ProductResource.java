package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.service.IProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductResource {
    private final IProductService productService;
    public ProductResource(IProductService productService){
        this.productService = productService;
    }
    @PostMapping("/list")
    public ResponseEntity<BaseResponse<Page<ProductDTO>>> getAll(@RequestBody ProductFilterRequest filterRequest,
                                                                 @RequestParam(name = "page",required = false,defaultValue = "0") int page,
                                                                 @RequestParam(name = "size",required = false,defaultValue = "10") int size){
        return ResponseEntity.ok(productService.getAll(filterRequest,page,size));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduction(@RequestBody ProductDTO productDTO){
        return ResponseEntity.ok(productService.createProduct(productDTO));
    }

}
