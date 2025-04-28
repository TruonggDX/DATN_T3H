package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.CartDto;
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

}
