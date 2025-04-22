package edu.t3h.clothes.model.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class BrandDto {

  private Long id;
  private String name;
  private String description;
  private String imageUrl;
}