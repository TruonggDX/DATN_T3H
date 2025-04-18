package edu.t3h.clothes.model.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductDto {

  private Long id;
  private String code;
  private String name;
  private String material;
  private String description;
  private Long quantity;
  private Double price;
  private BigDecimal importPrice;
  private String category;
  private String producer;
  private Long categoryId;
  private Long producerId;
}
