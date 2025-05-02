package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class ReviewDto {

  private Long id;
  private String code;
  private String comment;
  private Integer rating;
  private Long accountId;
  private String accountName;
  private Long productId;
  private String productName;
}
