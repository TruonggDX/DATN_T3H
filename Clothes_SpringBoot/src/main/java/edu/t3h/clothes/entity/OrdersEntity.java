package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class OrdersEntity extends AbstractEntity {

  private String code;
  private String status;
  private String address;
  private String notes;
  private Integer ship;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "account_id")
  private AccountEntity account;

}
