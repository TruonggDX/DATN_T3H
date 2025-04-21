package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "attribute")
public class AttributeEntity extends AbstractEntity {

  private String name;
}
