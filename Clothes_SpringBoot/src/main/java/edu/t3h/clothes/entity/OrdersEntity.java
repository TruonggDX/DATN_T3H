package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class OrdersEntity extends AbstractEntity{
    private String code;
    private Long quantity;
    private Double price;
    private String status;
    private String address;
    private String notes;
    private Integer ship;
    private Integer sales;
    private String payments;
    private String rate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;


    @ManyToOne
    @JoinColumn(name = "product_id")
    @ToString.Exclude
    private ProductEntity product;






    @OneToMany(mappedBy = "order")
    private List<OrderDetailsEntity> orderDetails;

}
