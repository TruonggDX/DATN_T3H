package edu.t3h.clothes.model.dto;

import java.util.List;
import java.util.Set;
import lombok.Data;

@Data
public class ProductDto {

  private Long id;
  private String code;
  private String name;
  private String sortDescription;
  private String description;
  private Long categoryId;
  private String categoryName;
  private Long brandId;
  private String brandName;
  private Set<Long> voucherIds;
  private List<ImageDto> imageDtos;
}
