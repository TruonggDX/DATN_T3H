package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.AccountDto;
import edu.t3h.clothes.model.request.AccountRequest;
import edu.t3h.clothes.model.request.ChangePasswordRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IAccountService {

  ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable);

  BaseResponse<AccountDto> updateAccountById(Long id, AccountRequest accountRequest,
      MultipartFile file);

  BaseResponse<AccountDto> getAccountById(Long id);

  BaseResponse<AccountDto> deleteAccountById(Long id);

  ResponsePage<List<AccountDto>> findByCondition(String code, String email, String roleCode,
      Pageable pageable);

  BaseResponse<AccountDto> changePassword(ChangePasswordRequest changePasswordRequest);

  BaseResponse<AccountDto> getAccount();
}
