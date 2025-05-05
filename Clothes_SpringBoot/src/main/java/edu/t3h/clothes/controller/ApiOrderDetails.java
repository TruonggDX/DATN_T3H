package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IOderDetailService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oder-details")
public class ApiOrderDetails {

  private final IOderDetailService iOderDetailService;

  @GetMapping("/get-by-oder/{orderId}")
  public ResponseEntity<BaseResponse<List<OrderDetailDto>>> getOrderDetailsByOderId(
      @PathVariable Long orderId) {
    BaseResponse<List<OrderDetailDto>> responsePage = iOderDetailService.getAllOrderDetail(orderId);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<OrderDetailDto>> createOderDetail(
      @RequestBody OrderDetailDto orderDetailDto) {
    BaseResponse<OrderDetailDto> response = iOderDetailService.createOrderDetail(orderDetailDto);
    return ResponseEntity.ok(response);
  }
}
