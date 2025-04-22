package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "brand")
public class BrandEntity extends AbstractEntity {

  private String name;
  private String description;
  private String image;

}
