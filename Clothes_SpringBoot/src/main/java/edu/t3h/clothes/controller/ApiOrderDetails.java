package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IOderDetailService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    if (responsePage.getData().isEmpty()) {
      responsePage.setCode(HttpStatus.NOT_FOUND.value());
      responsePage.setMessage("Không tìm thấy chi tiết đơn hàng với id: " + orderId);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responsePage);
    }

    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<OrderDetailDto>> createOderDetail(
      @RequestBody OrderDetailDto orderDetailDto) {

    BaseResponse<OrderDetailDto> response = iOderDetailService.createOrderDetail(orderDetailDto);

    if (response.getCode() == HttpStatus.BAD_REQUEST.value()
        || response.getCode() == HttpStatus.NOT_FOUND.value()) {
      return ResponseEntity.status(response.getCode()).body(response);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
