package edu.t3h.clothes.model.dto.auth;

import lombok.Data;

@Data
public class LoginUserDto {

  private String email;
  private String password;
}
