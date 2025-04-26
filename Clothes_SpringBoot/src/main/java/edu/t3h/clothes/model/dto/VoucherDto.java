package edu.t3h.clothes.model.dto;

import java.util.Date;
import java.util.Set;
import lombok.Data;

@Data
public class VoucherDto {

  private Long id;
  private String code;
  private String name;
  private String description;
  private String descriptionType;
  private Float discountValue;
  private Float minOrderAmount;
  private Integer quantity;
  private Boolean status;
  private Date startDate;
  private Date endDate;
  private Set<Long> productIds;
}
