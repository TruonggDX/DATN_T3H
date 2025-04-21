package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "payment")
public class PaymentEntity extends AbstractEntity {

  private String paymentMethod;
  @ManyToOne
  @JoinColumn(name = "order_id")
  @EqualsAndHashCode.Exclude
  private OrdersEntity ordersEntity;
}
