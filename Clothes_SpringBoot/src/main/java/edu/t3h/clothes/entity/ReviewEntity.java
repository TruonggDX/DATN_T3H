package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "review")
public class ReviewEntity extends AbstractEntity {

  private String comment;
  private Integer rating;
  @ManyToOne
  @JoinColumn(name = "account_id")
  @EqualsAndHashCode.Exclude
  private AccountEntity account;
  @ManyToOne
  @JoinColumn(name = "product_id")
  @EqualsAndHashCode.Exclude
  private ProductEntity productEntity;

}
