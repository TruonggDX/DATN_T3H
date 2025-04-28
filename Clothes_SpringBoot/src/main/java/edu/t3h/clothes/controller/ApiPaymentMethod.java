package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IPaymentMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
}
