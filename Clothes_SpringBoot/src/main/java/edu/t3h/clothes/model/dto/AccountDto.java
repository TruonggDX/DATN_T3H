package edu.t3h.clothes.model.dto;

import java.util.Set;
import lombok.Data;

@Data
public class AccountDto {

  private Long id;
  private String fullname;
  private String code;
  private String email;
  private String phone;
  private String address;
  private String birthday;
  private int loyalCustomers;
  private String password;
  private Set<Long> roleIds;
  private Set<RoleDto> roles;
  private boolean enabled;
  private String imageUrl;
}
