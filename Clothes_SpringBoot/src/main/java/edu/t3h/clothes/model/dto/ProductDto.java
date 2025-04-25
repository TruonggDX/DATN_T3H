package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class ProductDto {

  private Long id;
  private String code;
  private String name;
  private String sortDescription;
  private String description;
  private Long categoryId;
  private Long brandId;
}
