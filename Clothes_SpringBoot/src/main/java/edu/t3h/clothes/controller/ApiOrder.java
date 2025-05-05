package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.OrderDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IOrderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class ApiOrder {

  private final IOrderService orderService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<OrderDto>>> getAllOrders(Pageable pageable) {
    ResponsePage<List<OrderDto>> responsePage = orderService.getAllOrders(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @GetMapping("/get-oder-account")
  public ResponseEntity<ResponsePage<List<OrderDto>>> getOrdersByAccount(Pageable pageable) {
    ResponsePage<List<OrderDto>> responsePage = orderService.getOderByAccount(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<OrderDto>> createOrder(
      @RequestBody OrderDto oderDto) {
    BaseResponse<OrderDto> response = orderService.createOrder(oderDto);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<OrderDto>> updateOrders(@PathVariable Long id,
      @RequestBody OrderDto oderDto) {
    BaseResponse<OrderDto> response = orderService.updateOrder(id, oderDto);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update-status/{id}")
  public ResponseEntity<BaseResponse<OrderDto>> updateStatusOrder(@PathVariable Long id,
      String status) {
    BaseResponse<OrderDto> response = orderService.updateStatus(id, status);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<OrderDto>> deleteOrder(@PathVariable Long id) {
    BaseResponse<OrderDto> response = orderService.deleteOrder(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<OrderDto>> findOrderById(@PathVariable Long id) {
    BaseResponse<OrderDto> response = orderService.getOrderById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/searchByCondition")
  public ResponseEntity<ResponsePage<List<OrderDto>>> searchByCondition(
      @RequestParam(value = "code") String code,
      @RequestParam(value = "status") String status,
      Pageable pageable) {
    ResponsePage<List<OrderDto>> order = orderService.findByCondition(code, status, pageable);
    return ResponseEntity.ok(order);
  }

}
