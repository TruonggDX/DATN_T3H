package edu.t3h.clothes.model.dto;

import edu.t3h.clothes.model.response.VariantResponse;
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
  private VariantResponse variant;
}
