package edu.t3h.clothes.entity;

import jakarta.persistence.*;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "producer_product")


public class ProducerProductEntity extends AbstractEntity{


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private ProductEntity productEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producer_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private ProducerEntity producerEntity;

    public ProducerProductEntity() {
    }

}
