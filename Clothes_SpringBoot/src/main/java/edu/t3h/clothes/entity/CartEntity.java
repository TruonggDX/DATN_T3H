package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "shopping_cart")
public class CartEntity extends AbstractEntity{
    private Long number;
    private Double price;
    private Double total;
    private Double total_cart;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;
}
