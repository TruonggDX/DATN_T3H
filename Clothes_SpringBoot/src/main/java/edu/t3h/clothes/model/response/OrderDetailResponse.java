package edu.t3h.clothes.model.response;

import lombok.Data;

@Data
public class OrderDetailResponse {
  private Long id;
  private Long quantity;
  private Double price;
  private Long orderId;
  private Long productId;
  private String productName;
  private VariantResponse variant;
}
