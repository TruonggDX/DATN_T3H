package edu.t3h.clothes.model.request;

import lombok.Data;

@Data
public class ChangePassword {

  public String oldPassword;
  public String newPassword;
  public String confirmPassword;
}
