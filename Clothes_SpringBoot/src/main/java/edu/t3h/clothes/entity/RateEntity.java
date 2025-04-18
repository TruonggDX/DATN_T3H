package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "rate")
public class RateEntity extends AbstractEntity {
    private Integer star;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private ProductEntity product;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
