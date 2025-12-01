package edu.t3h.clothes.model.dto;

import jakarta.persistence.Id;
import java.util.List;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;

@Data
@Document(indexName = "products")

public class ProductIndex {

  @Id
  private Long id;
  private String code;
  private String name;
  private String sortDescription;
  private String description;
  private Long categoryId;
  private String categoryName;
  private Long brandId;
  private String brandName;
  private List<ImageDto> imageDtos;
}
