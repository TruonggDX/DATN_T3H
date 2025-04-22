package edu.t3h.clothes.service;


import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.model.dto.auth.LoginUserDto;
import edu.t3h.clothes.model.dto.auth.RegisterUserDto;
import edu.t3h.clothes.model.dto.auth.VerifyUserDto;
import edu.t3h.clothes.model.response.BaseResponse;

public interface IAuthService {

  BaseResponse<RegisterUserDto> signup(RegisterUserDto input);

  AccountEntity authenticate(LoginUserDto input);

  void verifyUser(VerifyUserDto input);

  void resendVerificationCode(String email);

  void sendVerificationEmail(String email, String verificationCode);
}
