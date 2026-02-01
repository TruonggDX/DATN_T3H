package edu.t3h.clothes.model.response;

import java.math.BigDecimal;
import java.util.List;
import lombok.Data;

@Data
public class VariantResponse {

  private Long id;
  private String code;
  private BigDecimal price;
  private Integer quantity;
  private Double discount;
  private List<AttributeValuesResponse> attributeValues;
}
