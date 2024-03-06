package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name = "producer_product")
public class ProducerProductEntity extends AbstractEntity{
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private ProductEntity productEntity;
//
//    @ManyToOne
//    @JoinColumn(name = "producer_id")
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private ProducerEntity producerEntity;
}
