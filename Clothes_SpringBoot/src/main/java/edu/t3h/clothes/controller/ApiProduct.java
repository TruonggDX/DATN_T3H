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

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<ProductDto>> getProductById(@PathVariable Long id) {
    BaseResponse<ProductDto> baseResponse = productService.getProductById(id);
    return ResponseEntity.ok(baseResponse);
  }
}
