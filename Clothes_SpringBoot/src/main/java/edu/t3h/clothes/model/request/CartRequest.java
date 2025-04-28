package edu.t3h.clothes.model.request;

import lombok.Data;

@Data
public class CartRequest {

  private Long number;
  private Long productId;
}
