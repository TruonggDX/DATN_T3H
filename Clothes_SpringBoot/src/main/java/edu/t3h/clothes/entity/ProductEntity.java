package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.*;

@Table(name = "product")
@Entity
@Data
public class ProductEntity extends AbstractEntity {
    private String code;
    private String name;
    private String material;
    private String description;
    private Long quantity;
    private BigDecimal price;
    private BigDecimal importPrice;
    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    private CategoryEntity categoryEntity;

    @ManyToOne
    @JoinColumn(name = "producer_id")
    @EqualsAndHashCode.Exclude
    private ProducerEntity producerEntity;




}
