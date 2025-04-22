package edu.t3h.clothes.model.dto.auth;

import edu.t3h.clothes.model.dto.RoleDto;
import java.util.Set;
import lombok.Data;

@Data
public class RegisterUserDto {

  private Long id;
  private String code;
  private String fullname;
  private String email;
  private String password;
  private Set<RoleDto> roles;
  private boolean enabled;
  private String phone;
  private Set<Long> roleIds;
}
