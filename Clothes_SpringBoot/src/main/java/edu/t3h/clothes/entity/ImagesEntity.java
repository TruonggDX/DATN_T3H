package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "image")
@Data
public class ImagesEntity extends AbstractEntity {

  private String url;
  private String publicId;
  private String type;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private ProductEntity productEntity;

  @ManyToOne
  @JoinColumn(name = "account_id")
  private AccountEntity accountEntity;
}
