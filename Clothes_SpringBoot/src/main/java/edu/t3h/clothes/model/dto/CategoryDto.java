package edu.t3h.clothes.model.dto;

import java.util.List;
import lombok.Data;

@Data
public class CategoryDto {

  private Long id;
  private String code;
  private String name;
  private List<CategoryDto> children;
  private Long parentId;
}

