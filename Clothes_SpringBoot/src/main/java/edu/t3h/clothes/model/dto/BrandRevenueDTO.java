package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class BrandRevenueDTO {
  private Long brandId;
  private String brandName;
  private Double totalRevenue;

  public BrandRevenueDTO(Long brandId, String brandName, Double totalRevenue) {
    this.brandId = brandId;
    this.brandName = brandName;
    this.totalRevenue = totalRevenue;
  }
}
