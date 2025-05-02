package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class BlogsDto {

  private Long id;
  private String title;
  private String sortDescription;
  private String description;
  private Long accountId;
  private Long categoryId;
  private String imageUrl;
}
