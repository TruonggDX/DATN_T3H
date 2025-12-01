package edu.t3h.clothes.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRevenueDTO {
  private Long paymentId;
  private String paymentName;
  private Double totalRevenue;

}
