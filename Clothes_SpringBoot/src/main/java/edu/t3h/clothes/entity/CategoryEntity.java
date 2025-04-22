package edu.t3h.clothes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "category")
public class CategoryEntity extends AbstractEntity {

  @Column(name = "code")
  private String code;
  @Column(name = "name")
  private String name;

  @ManyToOne
  @JoinColumn(name = "parent_id")
  private CategoryEntity parent;
}
