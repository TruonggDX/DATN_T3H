package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.exception.HandleUploadFileException;
import edu.t3h.clothes.mapper.AccountMapper;
import edu.t3h.clothes.model.dto.AccountDto;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.request.AccountRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.ImageRepository;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.service.IAccountService;
import edu.t3h.clothes.service.IUploadService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AccountImpl implements IAccountService {

  private final AccountRepository accountRepository;
  private final AccountMapper accountMapper;
  private final ImageRepository imageRepository;
  private final IUploadService uploadService;
  private final RoleRepository roleRepository;


  @Override
  public ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable) {
    ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
    Page<AccountEntity> page = accountRepository.getAllAccounts(pageable);
    List<AccountDto> accountDtos = page.getContent().stream().map(accountEntity -> {
      AccountDto accountDto = accountMapper.toDto(accountEntity);
      ImagesEntity images = imageRepository.findByAccountId(accountDto.getId());
      if (images != null) {
        accountDto.setImageUrl(images.getUrl());
      }
      return accountDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(accountDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<AccountDto> updateAccountById(Long id, AccountRequest accountRequest,
      MultipartFile file) {
    BaseResponse<AccountDto> response = new BaseResponse<>();
    Optional<AccountEntity> accountEntity = accountRepository.findById(id);
    if (accountEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.ACCOUNT_NOT_FOUND);
      return response;
    }
    Set<RoleEntity> roleIds = accountRequest.getRoleIds().stream()
        .map(roleId -> roleRepository.findById(roleId).orElse(null)).collect(
            Collectors.toSet());
    AccountEntity account = accountEntity.get();
    account.setFullname(accountRequest.getFullname());
    account.setAddress(accountRequest.getAddress());
    account.setPhone(accountRequest.getPhone());
    account.setBirthday(accountRequest.getBirthday());
    account.setRoles(roleIds);
    accountRepository.save(account);

    ImagesEntity images = imageRepository.findByAccountId(id);
    if (file != null && !file.isEmpty()) {
      if (images != null) {
        uploadService.deleteImage(images.getPublicId());
      } else {
        images = new ImagesEntity();
        images.setAccountEntity(account);
      }
      ImageDto imageDTO = null;
      try {
        imageDTO = uploadService.uploadImage(file);
      } catch (IOException e) {
        throw new HandleUploadFileException("Upload image error");
      }
      images.setUrl(imageDTO.getUrl());
      images.setType(file.getContentType());
      images.setPublicId(imageDTO.getPublicId());
      imageRepository.save(images);
      accountRequest.setImageUrl(images.getUrl());
    }
    if (images != null) {
      accountRequest.setImageUrl(images.getUrl());
    }
    AccountDto accountDto = accountMapper.toDto(account);
    if (images != null) {
      accountDto.setImageUrl(images.getUrl());
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(accountDto);
    return response;
  }

  @Override
  public BaseResponse<AccountDto> getAccountById(Long id) {
    BaseResponse<AccountDto> response = new BaseResponse<>();
    Optional<AccountEntity> optional = accountRepository.findById(id);
    if (optional.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.ACCOUNT_NOT_FOUND);
      return response;
    }
    AccountEntity accountEntity = optional.get();
    AccountDto accountDto = accountMapper.toDto(accountEntity);
    ImagesEntity images = imageRepository.findByAccountId(accountDto.getId());
    if (images != null) {
      accountDto.setImageUrl(images.getUrl());
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(accountDto);
    return response;
  }

  @Override
  public BaseResponse<AccountDto> deleteAccountById(Long id) {
    BaseResponse<AccountDto> response = new BaseResponse<>();
    Optional<AccountEntity> optional = accountRepository.findById(id);
    if (optional.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.ACCOUNT_NOT_FOUND);
      return response;
    }
    AccountEntity accountEntity = optional.get();
    accountEntity.setDeleted(true);
    accountRepository.save(accountEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(accountMapper.toDto(accountEntity));
    return response;
  }

  @Override
  public ResponsePage<List<AccountDto>> findByCondition(String code, String email, String roleCode,
      Pageable pageable) {
    ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
    Page<AccountEntity> page = accountRepository.findByCondition(code, email, roleCode, pageable);
    List<AccountDto> accountDtos = page.getContent().stream().map(accountEntity -> {
      AccountDto accountDto = accountMapper.toDto(accountEntity);
      ImagesEntity images = imageRepository.findByAccountId(accountDto.getId());
      if (images != null) {
        accountDto.setImageUrl(images.getUrl());
      }
      return accountDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(accountDtos);
    return responsePage;
  }
}
