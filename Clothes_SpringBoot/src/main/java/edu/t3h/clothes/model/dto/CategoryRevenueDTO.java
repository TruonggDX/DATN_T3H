package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class CategoryRevenueDTO {

  private Long categoryId;
  private String categoryName;
  private Double totalRevenue;

  public CategoryRevenueDTO(Long categoryId, String categoryName, Double totalRevenue) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.totalRevenue = totalRevenue;
  }


}
