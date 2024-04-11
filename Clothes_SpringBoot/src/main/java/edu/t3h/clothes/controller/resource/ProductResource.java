package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.DataService;
import edu.t3h.clothes.service.IProducerService;
import edu.t3h.clothes.service.IProductService;
import edu.t3h.clothes.utils.Constant;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
public class ProductResource {
    @Autowired
    private DataService dataService;
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
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        BaseResponse<?> createdProduct = productService.createProduct(productDTO);
        if (createdProduct != null && createdProduct.getCode() == HttpStatus.OK.value()) {
            // In ra thông tin của sản phẩm đã được tạo thành công
            System.out.println("Product created successfully:");
            System.out.println(createdProduct.toString());
            // Trả về phản hồi cho client
            return ResponseEntity.ok().body(createdProduct);
        } else {
            // Nếu sản phẩm không được tạo thành công hoặc có lỗi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createdProduct != null ? createdProduct.getMessage() : "Failed to create product");
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

    @GetMapping("/search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        ProductDTO productDTO = productService.findProductById(id);
        if (productDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,productDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
    }

    // tìm kiếm sản phẩm theo danh mục
    @GetMapping("/searchProductByCategories/{categoryId}")
    public ResponseEntity<BaseResponse<List<ProductDTO>>> getProductsByCategoryId(@PathVariable Long categoryId) {
        BaseResponse<List<ProductDTO>> response = productService.findProductsByCategoryId(categoryId);
        if (response.getCode()==HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // tìm kiếm theo tên sản phẩm (user)
    @GetMapping("/searchProductByName/{name}")
    public ResponseEntity<BaseResponse<List<ProductDTO>>> findProductsByName(@PathVariable String name) {
        BaseResponse<List<ProductDTO>> response = productService.findProductsByName(name);
        if (response.getCode()==HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    // tìm kiếm sản phẩm theo tên hoặc mã
    @GetMapping("/searchByCondition/{condition}")
    public BaseResponse<?> searchOrdersByCondition(@PathVariable String condition) {
        BaseResponse<List<ProductDTO>> productDto = productService.searchProductCondition(condition);
        if (productDto.getData() != null && !productDto.getData().isEmpty()) {
            BaseResponse<List<ProductDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(productDto.getData());
            return response;
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }

    // san pham best seller
    @GetMapping("/bestsellers")
    public ResponseEntity<BaseResponse<List<ProductDTO>>> getBestSellers() {
        BaseResponse<List<ProductDTO>> response = productService.getProductBestSellers();

        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //tim kiem theo khoang gia
    @GetMapping("/searchByPriceRange")
    public ResponseEntity<BaseResponse<List<ProductDTO>>> findProductsInPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
        BaseResponse<List<ProductDTO>> response = productService.findProductsInPriceRange(minPrice, maxPrice);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getCode()));
    }
    @GetMapping("/all")
    public Map<String, List<?>> getAllData() {
        return dataService.getAllData();
    }
}
