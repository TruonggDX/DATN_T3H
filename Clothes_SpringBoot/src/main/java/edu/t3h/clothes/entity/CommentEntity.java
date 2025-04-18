package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "comments")
public class CommentEntity extends AbstractEntity {
    private String comments;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "rate_id")
    private RateEntity rate;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;
}
