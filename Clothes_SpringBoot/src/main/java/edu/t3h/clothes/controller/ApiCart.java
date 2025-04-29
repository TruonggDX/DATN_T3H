package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.CartDto;
import edu.t3h.clothes.model.request.CartRequest;
import edu.t3h.clothes.model.request.UpdateCartRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.ICartService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class ApiCart {

  private final ICartService iCartService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<CartDto>>> getAllCarts(Pageable pageable) {
    ResponsePage<List<CartDto>> responsePage = iCartService.getAllCarts(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<CartDto>> addProductToCart(
      @RequestBody CartRequest cartRequest) {
    BaseResponse<CartDto> response = iCartService.addCart(cartRequest);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<CartDto>> updateCartById(@PathVariable Long id,
      @RequestBody UpdateCartRequest updateCartRequest) {
    BaseResponse<CartDto> response = iCartService.updateCart(id, updateCartRequest);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<CartDto>> deleteCartById(@PathVariable Long id) {
    BaseResponse<CartDto> response = iCartService.deleteCart(id);
    return ResponseEntity.ok(response);
  }
}
