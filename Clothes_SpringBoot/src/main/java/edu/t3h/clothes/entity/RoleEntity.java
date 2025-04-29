package edu.t3h.clothes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "role")
@Data
@Entity
public class RoleEntity extends AbstractEntity {

  @Column(name = "code")
  private String code;
  @Column(name = "name")
  private String name;
  @ManyToMany(mappedBy = "roles")
  @EqualsAndHashCode.Exclude
  private Set<AccountEntity> users = new HashSet<>();

}
