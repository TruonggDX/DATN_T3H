package edu.t3h.clothes.model.request;

import lombok.Data;

@Data
public class OrderRequest {

  private Long id;
  private String notes;
  private String address;
}
