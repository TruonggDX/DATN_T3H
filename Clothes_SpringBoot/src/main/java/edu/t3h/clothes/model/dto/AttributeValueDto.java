package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class AttributeValueDto {
  private Long id;
  private String value;
  private Long attributeId;
}
