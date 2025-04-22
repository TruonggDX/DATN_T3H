package edu.t3h.clothes.model.dto.auth;


import edu.t3h.clothes.model.dto.RoleDto;
import java.util.Set;
import lombok.Data;

@Data
public class AuthDto {

  private String email;
  private Set<RoleDto> roles;
}
