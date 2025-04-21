package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "product")
@Entity
@Data
public class ProductEntity extends AbstractEntity {

  private String code;
  private String name;
  private String description;
  @ManyToOne
  @JoinColumn(name = "category_id")
  @EqualsAndHashCode.Exclude
  private CategoryEntity categoryEntity;
  @ManyToOne
  @JoinColumn(name = "producer_id")
  @EqualsAndHashCode.Exclude
  private ProducerEntity producerEntity;
  @ManyToOne
  @JoinColumn(name = "brand_id")
  @EqualsAndHashCode.Exclude
  private BrandEntity brandEntity;

}
