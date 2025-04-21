package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.request.MomoRequest;
import edu.t3h.clothes.model.response.VNPayResponse;
import edu.t3h.clothes.service.IPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class ApiPayment {

  private final IPaymentService paymentService;

  @GetMapping("/vn-pay")
  public VNPayResponse pay(HttpServletRequest request) {
    return paymentService.createVnPayPayment(request);
  }

  @GetMapping("/vnpay_return")
  public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> queryParams) {
    String responseCode = queryParams.get("vnp_ResponseCode");
    if ("00".equals(responseCode)) {
      return ResponseEntity.ok(Map.of("status", "00", "message", "Payment success"));
    }
    return ResponseEntity.badRequest()
        .body(Map.of("status", responseCode, "message", "Payment failed"));
  }


  //MOMO
  @PostMapping()
  public ResponseEntity<String> momoPayment(@RequestBody MomoRequest paymentRequest) {
    String response = paymentService.createPaymentRequest(paymentRequest.getAmount());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/order-status/{orderId}")
  public ResponseEntity<String> checkPaymentStatus(@PathVariable String orderId) {
    String response = paymentService.checkPaymentStatus(orderId);
    return ResponseEntity.ok(response);
  }

  //Zalo Pay
  @PostMapping("/create-zalopay")
  public ResponseEntity<String> createPayment(@RequestBody Map<String, Object> orderRequest) {
    try {
      String response = paymentService.createOrder(orderRequest);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(e.getMessage());
    }
  }

  @GetMapping("/order-status-zalopay/{appTransId}")
  public ResponseEntity<String> getOrderStatus(@PathVariable String appTransId) {
    String response = paymentService.getOrderStatus(appTransId);
    return ResponseEntity.ok(response);
  }


}
