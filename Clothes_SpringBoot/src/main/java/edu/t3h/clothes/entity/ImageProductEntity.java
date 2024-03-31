package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "image_product")
public class ImageProductEntity extends AbstractEntity {
    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productEntities;
}
