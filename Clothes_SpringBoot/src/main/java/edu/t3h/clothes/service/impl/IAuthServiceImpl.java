package edu.t3h.clothes.service.impl;


import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.model.dto.auth.LoginUserDto;
import edu.t3h.clothes.model.dto.auth.RegisterUserDto;
import edu.t3h.clothes.model.dto.auth.VerifyUserDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.service.IAuthService;
import edu.t3h.clothes.service.IEmailService;
import edu.t3h.clothes.utils.Constant;
import jakarta.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IAuthServiceImpl implements IAuthService {

  private final AccountRepository accountRepository;
  private final RoleRepository roleRepository;
  private final IEmailService emailService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  @Qualifier("hazelcastServerInstance")
  private final HazelcastInstance hazelcastInstance;


  @Override
  public BaseResponse<RegisterUserDto> signup(RegisterUserDto registerUserDto) {
    BaseResponse<RegisterUserDto> response = new BaseResponse<>();
    String verificationCode = generateVerificationCode();

    IMap<String, String> otpMap = hazelcastInstance.getMap("otpCodes");
    otpMap.put(registerUserDto.getEmail(), verificationCode, 60, TimeUnit.SECONDS);
    try {
      sendVerificationEmail(registerUserDto.getEmail(), verificationCode);
      response.setData(registerUserDto);
      response.setCode(HttpStatus.OK.value());
      response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    } catch (Exception e) {
      throw new RuntimeException("Failed to send verification email", e);
    }
    return response;
  }

  @Override
  public AccountEntity authenticate(LoginUserDto loginUserDto) {
    AccountEntity user = accountRepository.findByEmail(loginUserDto.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));
    if (!user.isEnabled()) {
      throw new RuntimeException("Account not verified. Please verify your account.");
    }
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginUserDto.getEmail(),
            loginUserDto.getPassword()
        )
    );
    return user;
  }

  @Override
  public void verifyUser(VerifyUserDto verifyUserDto) {
    IMap<String, String> otpMap = hazelcastInstance.getMap("otpCodes");
    String storedCode = otpMap.get(verifyUserDto.getRegisterUserDto().getEmail());
    if (storedCode == null || !storedCode.equals(verifyUserDto.getVerificationCode())) {
      throw new RuntimeException("Invalid or expired verification code");
    }
    AccountEntity account = new AccountEntity(
        verifyUserDto.getRegisterUserDto().getCode(),
        verifyUserDto.getRegisterUserDto().getFullname(),
        passwordEncoder.encode(verifyUserDto.getRegisterUserDto().getPassword()),
        verifyUserDto.getRegisterUserDto().getEmail(),
        verifyUserDto.getRegisterUserDto().getPhone()
    );
    account.setEnabled(false);
    account.setDeleted(false);
    Set<RoleEntity> roles = verifyUserDto.getRegisterUserDto().getRoleIds().stream().map(
        roleId -> roleRepository.findById(roleId)
            .orElseThrow(() -> new UsernameNotFoundException("Role not found"))
    ).collect(Collectors.toSet());
    account.setRoles(roles);
    account.setEnabled(true);
    account.setCode("UID" + LocalDateTime.now().getYear() + 00001);
    accountRepository.save(account);
  }

  @Override
  public void resendVerificationCode(String email) {
    Optional<AccountEntity> optionalUser = accountRepository.findByEmail(email);
    if (optionalUser.isPresent()) {
      throw new RuntimeException("Account is already verified");
    }

    IMap<String, String> otpMap = hazelcastInstance.getMap("otpCodes");
    String verificationCode = otpMap.get(email);
    if (verificationCode == null) {
      verificationCode = generateVerificationCode();
      otpMap.put(email, verificationCode, 60, TimeUnit.SECONDS);
    }
    try {
      sendVerificationEmail(email, verificationCode);
    } catch (Exception e) {
      throw new RuntimeException("Failed to send verification email", e);
    }

  }

  @Override
  public void sendVerificationEmail(String email, String verificationCode) {
    String subject = "Account Verification";
    String htmlMessage = "<html>"
        + "<body style=\"font-family: Arial, sans-serif;\">"
        + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
        + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
        + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
        + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
        + "<h3 style=\"color: #333;\">Verification Code:</h3>"
        + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode
        + "</p>"
        + "</div>"
        + "</div>"
        + "</body>"
        + "</html>";

    try {
      emailService.sendVerificationEmail(email, subject, htmlMessage);
    } catch (MessagingException e) {
      e.printStackTrace();
    }
  }

  private String generateVerificationCode() {
    Random random = new Random();
    int code = random.nextInt(900000) + 100000;
    return String.valueOf(code);
  }

}
