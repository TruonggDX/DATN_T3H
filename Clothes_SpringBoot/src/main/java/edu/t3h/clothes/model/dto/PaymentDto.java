package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class PaymentDto {

  private String paymentMethod;
  private Long orderId;
}
