package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.dto.RevenueStatisticsDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.OrderDetailResponse;
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
  public ResponseEntity<BaseResponse<List<OrderDetailResponse>>> getOrderDetailsByOderId(
      @PathVariable Long orderId) {
    BaseResponse<List<OrderDetailResponse>> responsePage = iOderDetailService.getAllOrderDetail(orderId);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<OrderDetailDto>> createOderDetail(
      @RequestBody OrderDetailDto orderDetailDto) {
    BaseResponse<OrderDetailDto> response = iOderDetailService.createOrderDetail(orderDetailDto);
    return ResponseEntity.ok(response);
  }
  @GetMapping("/get-total/{productId}")
  public ResponseEntity<BaseResponse<Long>> getTotal(
      @PathVariable Long productId) {
    BaseResponse<Long> responsePage = iOderDetailService.totalSoldByProductId(productId);
    return ResponseEntity.ok(responsePage);
  }

  @GetMapping("/revenue-day")
  public ResponseEntity<BaseResponse<List<RevenueStatisticsDTO>>> revenueDay() {
    BaseResponse<List<RevenueStatisticsDTO>> responsePage = iOderDetailService.getRevenueByDay();
    return ResponseEntity.ok(responsePage);
  }

  @GetMapping("/revenue-month")
  public ResponseEntity<BaseResponse<List<RevenueStatisticsDTO>>> revenueMonth() {
    BaseResponse<List<RevenueStatisticsDTO>> responsePage = iOderDetailService.getRevenueByMonth();
    return ResponseEntity.ok(responsePage);
  }

  @GetMapping("/revenue-year")
  public ResponseEntity<BaseResponse<List<RevenueStatisticsDTO>>> revenueYear() {
    BaseResponse<List<RevenueStatisticsDTO>> responsePage = iOderDetailService.getRevenueByYear();
    return ResponseEntity.ok(responsePage);
  }
}
