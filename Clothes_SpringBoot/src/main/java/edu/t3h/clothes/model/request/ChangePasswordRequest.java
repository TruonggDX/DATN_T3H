package edu.t3h.clothes.model.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {

  private Long id;
  private String oldPassword;
  private String newPassword;
  private String confirmPassword;
}
