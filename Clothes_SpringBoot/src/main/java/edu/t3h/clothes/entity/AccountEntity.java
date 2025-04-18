package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Entity
@Table(name = "account")
@Data
public class AccountEntity extends AbstractEntity {

  @Column(name = "fullname")
  private String fullname;
  @Column(name = "code")
  private String code;
  @Column(name = "email")
  private String email;
  @Column(name = "password")
  private String password;
  @Column(name = "phone")
  private String phone;
  @Column(name = "address")
  private String address;
  @Column(name = "birthday")
  private String birthday;
  @Column(name = "loyal_customers")
  private Boolean loyalCustomers;
  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
  @JoinTable(name = "account_role", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<RoleEntity> roles = new HashSet<>();

}
