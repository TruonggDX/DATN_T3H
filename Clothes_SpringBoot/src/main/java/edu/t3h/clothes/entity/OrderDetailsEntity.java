package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_dentails")
public class OrderDetailsEntity extends AbstractEntity{
    private Long quantity;
    @Column(name = "name_product")
    private String nameProduct;
    private Double price;
    @ManyToOne
    @JoinColumn(name = "orders_id", nullable = false)
    private OrdersEntity order;

}
