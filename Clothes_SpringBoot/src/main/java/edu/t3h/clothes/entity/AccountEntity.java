package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Entity
@Table(name = "account")
@Data
public class AccountEntity extends AbstractEntity {

  private String fullname;
  private String code;
  private String email;
  private String password;
  private String phone;
  private String address;
  private String birthday;
  private Boolean loyalCustomers;
  private boolean enabled;
  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
  @JoinTable(name = "account_role", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<RoleEntity> roles = new HashSet<>();

  public AccountEntity(String code, String fullname, String password, String email, String phone) {
    this.code = code;
    this.fullname = fullname;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  public AccountEntity() {
  }
}
