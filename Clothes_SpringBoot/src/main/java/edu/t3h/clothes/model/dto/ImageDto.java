package edu.t3h.clothes.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDto {

  private Long id;
  private String url;
  private String publicId;
  private String type;
}
