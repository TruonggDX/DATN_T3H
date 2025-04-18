package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "order_details")
public class OrderDetailsEntity extends AbstractEntity {

  private Long quantity;
  private Double price;
  @ManyToOne
  @JoinColumn(name = "orders_id", nullable = false)
  private OrdersEntity order;
  @ManyToOne
  @JoinColumn(name = "product_id")
  @ToString.Exclude
  private ProductEntity product;
}
