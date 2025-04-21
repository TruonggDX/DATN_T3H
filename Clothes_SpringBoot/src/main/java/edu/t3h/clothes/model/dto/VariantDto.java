package edu.t3h.clothes.model.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class VariantDto {
  private String code;
  private BigDecimal price;
  private Integer quantity;
  private Long productId;
}
