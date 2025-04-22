package edu.t3h.clothes.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

  private String token;
  private long expiresIn;
}
