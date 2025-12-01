package edu.t3h.clothes.model.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class OrderDto {

  private Long id;
  private String status;
  private String address;
  private String notes;
  private Integer ship;

  private String code;
  private Long accountId;
  private String accountName;
  private LocalDateTime createdDate;
  private String phone;
}
