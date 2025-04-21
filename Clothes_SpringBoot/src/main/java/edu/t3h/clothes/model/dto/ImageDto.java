package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class ImageDto {

  private Long id;
  private String url;
  private String publicId;
  private String type;
}
