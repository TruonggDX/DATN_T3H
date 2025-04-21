package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "attribute_value")
public class AttributeValueEntity extends AbstractEntity {

  private String value;
  @ManyToOne
  @JoinColumn(name = "attribute_id")
  @EqualsAndHashCode.Exclude
  private AttributeEntity attributeEntity;
  @ManyToMany(mappedBy = "attributeValueEntities")
  private Set<VariantEntity> variantEntities = new HashSet<>();

}
