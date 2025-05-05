package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class OrderDetailDto {

  private Long id;
  private Long quantity;
  private Double price;
  private Long orderId;
  private Long productId;
}
