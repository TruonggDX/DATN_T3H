package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "blogs")
public class BlogsEntity extends AbstractEntity {

  private String code;
  private String title;
  private String sortDescription;
  private String description;
  @ManyToOne
  @JoinColumn(name = "account_id")
  @EqualsAndHashCode.Exclude
  private AccountEntity account;
  @ManyToOne
  @JoinColumn(name = "category_id")
  @EqualsAndHashCode.Exclude
  private CategoryEntity categoryEntity;

}
