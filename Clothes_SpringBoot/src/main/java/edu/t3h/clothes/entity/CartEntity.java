package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cart")
public class CartEntity extends AbstractEntity {

  private Long number;
  @ManyToOne
  @JoinColumn(name = "account_id")
  private AccountEntity account;
  @ManyToOne
  @JoinColumn(name = "product_id")
  private ProductEntity product;
}
