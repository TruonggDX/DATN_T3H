package edu.t3h.clothes.model.request;

import lombok.Data;

@Data
public class UserRequest {
  private Long id;
  private String code;
  private String username;
  private String password;
  private Long roleId;
}
