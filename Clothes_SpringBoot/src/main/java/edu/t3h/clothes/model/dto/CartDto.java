package edu.t3h.clothes.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDto {

  private Long id;
  private Long number;
  private Long accountId;
  private Long productId;
  private ProductDto product;
}
