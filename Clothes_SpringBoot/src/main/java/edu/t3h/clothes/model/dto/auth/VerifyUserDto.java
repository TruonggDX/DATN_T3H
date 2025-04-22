package edu.t3h.clothes.model.dto.auth;

import lombok.Data;

@Data
public class VerifyUserDto {

  private String verificationCode;
  private RegisterUserDto registerUserDto;
}
