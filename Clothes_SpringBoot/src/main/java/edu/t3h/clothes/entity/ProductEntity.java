package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.*;

@Table(name = "product")
@Entity
@Data
public class ProductEntity extends AbstractEntity {

  private String code;
  private String name;
  private String sortDescription;
  private String description;
  @ManyToOne
  @JoinColumn(name = "category_id")
  @EqualsAndHashCode.Exclude
  private CategoryEntity categoryEntity;
  @ManyToOne
  @JoinColumn(name = "brand_id")
  @EqualsAndHashCode.Exclude
  private BrandEntity brandEntity;
  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
  @JoinTable(name = "voucher_product", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "voucher_id"))
  private Set<VoucherEntity> voucherEntities = new HashSet<>();
  @OneToMany(mappedBy = "productEntity")
  private List<ImagesEntity> imagesEntities;
}
