package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IPaymentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class ApiPayment {

  private final IPaymentService iPaymentService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<PaymentDto>>> getAllPayments(Pageable pageable) {
    ResponsePage<List<PaymentDto>> responsePage = iPaymentService.getAllPayments(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<PaymentDto>> createPayment(
      @RequestBody PaymentDto paymentDto) {
    BaseResponse<PaymentDto> response = iPaymentService.createPayment(paymentDto);
    return ResponseEntity.ok(response);
  }

}
