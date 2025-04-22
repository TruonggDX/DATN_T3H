package edu.t3h.clothes.controller;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.mapper.AccountMapper;
import edu.t3h.clothes.model.dto.AccountDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.dto.auth.LoginUserDto;
import edu.t3h.clothes.model.dto.auth.RegisterUserDto;
import edu.t3h.clothes.model.dto.auth.VerifyUserDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.LoginResponse;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class ApiAuth {

  private final IAuthService iAuthService;
  private final JwtService jwtService;
  private final AccountMapper accountMapper;

  @PostMapping("/signup")
  public ResponseEntity<BaseResponse<RegisterUserDto>> signup(@RequestBody RegisterUserDto input) {
    BaseResponse<RegisterUserDto> userDTO = iAuthService.signup(input);
    return ResponseEntity.ok(userDTO);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
    AccountEntity authenticatedUser = iAuthService.authenticate(loginUserDto);
    AccountDto accountDto = accountMapper.toDto(authenticatedUser);
    String jwtToken = jwtService.generateToken(accountDto);
    LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/verify")
  public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
    try {
      iAuthService.verifyUser(verifyUserDto);
      return ResponseEntity.ok("Account verified successfully");
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/decode-token")
  public ResponseEntity<AuthDto> decodeToken() {
    AuthDto decodedClaims = jwtService.decodeToken();
    return ResponseEntity.ok(decodedClaims);
  }

  @PostMapping("/resend")
  public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
    try {
      iAuthService.resendVerificationCode(email);
      return ResponseEntity.ok("Verification code sent");
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}

