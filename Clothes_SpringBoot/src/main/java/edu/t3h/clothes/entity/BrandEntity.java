package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "brand")
public class BrandEntity extends AbstractEntity {
  private String code;
  private String name;
  private String description;
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "image_id")
  private ImagesEntity image;

}
