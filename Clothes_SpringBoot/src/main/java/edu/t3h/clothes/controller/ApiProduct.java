package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.ProductDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ApiProduct {

  private final IProductService productService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<ProductDto>>> getAllProducts(Pageable pageable) {
    ResponsePage<List<ProductDto>> responsePage = productService.getAllProducts(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<ProductDto>> createProduct(
      @ModelAttribute ProductDto productDto,
      @RequestParam(value = "file", required = false) List<MultipartFile> file) {
    BaseResponse<ProductDto> response = productService.createProduct(productDto, file);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<ProductDto>> updateProduct(@PathVariable Long id,
      @ModelAttribute ProductDto productDto,
      @RequestParam(value = "file") List<MultipartFile> file) {
    BaseResponse<ProductDto> response = productService.updateProduct(id, productDto, file);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<ProductDto>> getProductById(@PathVariable Long id) {
    BaseResponse<ProductDto> baseResponse = productService.getProductById(id);
    return ResponseEntity.ok(baseResponse);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<ProductDto>> deleteProduct(@PathVariable Long id) {
    BaseResponse<ProductDto> baseResponse = productService.deleteProduct(id);
    return ResponseEntity.ok(baseResponse);
  }

  @GetMapping("/findCondition")
  public ResponseEntity<ResponsePage<List<ProductDto>>> findProductByCondition(
      @RequestParam(value = "code", required = false) String code,
      @RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "cateId", required = false) Long cateId,
      @RequestParam(value = "brandId", required = false) Long brandId,
      Pageable pageable) {
    ResponsePage<List<ProductDto>> responsePage = productService.findProductsByCondition(code, name,
        cateId, brandId, pageable);
    return ResponseEntity.ok(responsePage);
  }
}
