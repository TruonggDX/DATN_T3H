package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.dto.PaymentRevenueDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IPaymentMethod;
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
@RequestMapping("/api/payment-method")
@RequiredArgsConstructor
public class ApiPaymentMethod {

  private final IPaymentMethod iPaymentMethod;

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<PaymentDto>> create(@RequestBody PaymentDto paymentDto) {
    BaseResponse<PaymentDto> response = iPaymentMethod.createPayment(paymentDto);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/get-by-orderId/{orderId}")
  public ResponseEntity<BaseResponse<PaymentDto>> create(@PathVariable Long orderId) {
    BaseResponse<PaymentDto> response = iPaymentMethod.getByOrderId(orderId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/revenue-payment")
  public ResponseEntity<BaseResponse<List<PaymentRevenueDTO>>> getRevenue() {
    BaseResponse<List<PaymentRevenueDTO>> categoryDTO = iPaymentMethod.getPaymentRevenue();
    return ResponseEntity.ok(categoryDTO);
  }
}
