package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class OrderDto {

  private Long id;
  private String code;
  private String status;
  private String address;
  private String notes;
  private Integer ship;
  private Long accountId;
}
