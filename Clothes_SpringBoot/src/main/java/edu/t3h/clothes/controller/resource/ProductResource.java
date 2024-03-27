package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.service.IProductService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductResource {
    private final IProductService productService;
    public ProductResource(IProductService productService){
        this.productService = productService;
    }

    @GetMapping("/list")
    public ResponseEntity<BaseResponse<Page<ProductDTO>>> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {


        ProductFilterRequest filterRequest = new ProductFilterRequest();
        return ResponseEntity.ok(productService.getAll(filterRequest, page, size));
    }


    @PostMapping("/create")
    public ResponseEntity<?> createProduction(@RequestBody ProductDTO productDTO){
        BaseResponse<?> createdProduct = productService.createProduct(productDTO);
        if (createdProduct != null) {
            // In ra thông tin của sản phẩm đã được tạo thành công
            System.out.println("Product created successfully:");
            System.out.println(createdProduct.toString());
            // Trả về phản hồi cho client
            return ResponseEntity.ok().body(createdProduct);
        } else {
            // Nếu sản phẩm không được tạo thành công
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create product");
        }
    }


    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?>deleteProduct(@PathVariable Long productId) {
        BaseResponse<?> response = productService.deleteProduct(productId);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<?>updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDTO) {
        BaseResponse<?> response = productService.updateProduct(productId, productDTO);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }


}
