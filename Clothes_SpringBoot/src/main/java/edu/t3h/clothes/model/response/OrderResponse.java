package edu.t3h.clothes.model.response;

import lombok.Data;

@Data
public class OrderResponse {

  private String productName;
  private String categoryName;
  private String price;
  private String status;
  private String imageUrl;
  private AttributeValuesResponse attributeValues;
}
