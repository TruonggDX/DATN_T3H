package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.AccountDto;
import edu.t3h.clothes.model.request.AccountRequest;
import edu.t3h.clothes.model.request.ChangePasswordRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IAccountService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class ApiAccount {

  private final IAccountService iAccountService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<AccountDto>>> getAllAccounts(
      @RequestParam(value = "code") String code,
      @RequestParam(value = "email") String email,
      @RequestParam(value = "roleCode") String roleCode,
      Pageable pageable) {
    ResponsePage<List<AccountDto>> responsePage = iAccountService.getAllAccounts(code,email,roleCode,pageable);
    return ResponseEntity.ok(responsePage);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<AccountDto>> getAccountById(@PathVariable Long id) {
    BaseResponse<AccountDto> baseResponse = iAccountService.getAccountById(id);
    return ResponseEntity.ok(baseResponse);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<AccountDto>> createAccount(
      @ModelAttribute AccountDto accountDto,
      @RequestParam(value = "file", required = false) MultipartFile file) {
    BaseResponse<AccountDto> response = iAccountService.createAccount(accountDto, file);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<AccountDto>> updateAccount(@PathVariable Long id,
      @ModelAttribute AccountRequest accountRequest,
      @RequestParam(value = "file", required = false) MultipartFile file) {
    BaseResponse<AccountDto> response = iAccountService.updateAccountById(id, accountRequest, file);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<AccountDto>> deleteAccountById(@PathVariable Long id) {
    BaseResponse<AccountDto> baseResponse = iAccountService.deleteAccountById(id);
    return ResponseEntity.ok(baseResponse);
  }

  @GetMapping("/findByCondition")
  public ResponseEntity<ResponsePage<List<AccountDto>>> getByCondition(
      @RequestParam(value = "code") String code,
      @RequestParam(value = "email") String email,
      @RequestParam(value = "roleCode") String roleCode,
      Pageable pageable) {
    ResponsePage<List<AccountDto>> responsePage = iAccountService.findByCondition(code, email,
        roleCode, pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PutMapping("/change-password/{id}")
  public ResponseEntity<BaseResponse<?>> updatePass(@PathVariable Long id, @RequestBody ChangePasswordRequest chagePasswordRequest) {
    BaseResponse<?> response = iAccountService.changePassword(id, chagePasswordRequest);
    return ResponseEntity.ok(response);
  }
  @GetMapping("/get-account")
  public ResponseEntity<BaseResponse<AccountDto>> getUser() {
    BaseResponse<AccountDto> response = iAccountService.getAccount();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/total-account")
  public ResponseEntity<BaseResponse<Long>> getTotalAccount() {
    BaseResponse<Long> response = iAccountService.totalAccount();
    return ResponseEntity.ok(response);
  }
}
