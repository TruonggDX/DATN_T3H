package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.mapper.RoleMapper;
import edu.t3h.clothes.model.dto.RoleDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.service.IRoleService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleImpl implements IRoleService {

  private final RoleRepository roleRepository;
  private final RoleMapper roleMapper;

  @Override
  public ResponsePage<List<RoleDto>> getAllRoles(Pageable pageable) {
    ResponsePage<List<RoleDto>> responsePage = new ResponsePage<>();
    Page<RoleEntity> page = roleRepository.listRole(pageable);
    List<RoleDto> roleDtos = page.getContent().stream().map(roleMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(roleDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<RoleDto> addRole(RoleDto role) {
    BaseResponse<RoleDto> response = new BaseResponse<>();
    RoleEntity roleEntity = roleMapper.toEntity(role);
    roleEntity.setCode(role.getName().toUpperCase());
    roleEntity.setDeleted(false);
    roleRepository.save(roleEntity);
    response.setData(roleMapper.toDto(roleEntity));
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    return response;
  }

  @Override
  public BaseResponse<RoleDto> updateRole(Long id, RoleDto role) {
    BaseResponse<RoleDto> response = new BaseResponse<>();
    Optional<RoleEntity> check = roleRepository.findById(id);
    if (check.isEmpty()) {
      response.setMessage(HTTP_MESSAGE.FAILED);
      response.setCode(HttpStatus.NOT_FOUND.value());
      return response;
    }
    RoleEntity roleEntity = roleMapper.toEntity(role);
    roleEntity.setId(id);
    roleEntity.setDeleted(false);
    roleRepository.save(roleEntity);
    response.setData(roleMapper.toDto(roleEntity));
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    return response;
  }

  @Override
  public BaseResponse<RoleDto> deleteRole(Long id) {
    BaseResponse<RoleDto> response = new BaseResponse<>();
    Optional<RoleEntity> check = roleRepository.findById(id);
    if (check.isEmpty()) {
      response.setMessage(HTTP_MESSAGE.FAILED);
      response.setCode(HttpStatus.NOT_FOUND.value());
      return response;
    }
    RoleEntity roleEntity = check.get();
    roleEntity.setDeleted(true);
    roleRepository.save(roleEntity);
    response.setData(roleMapper.toDto(roleEntity));
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<RoleDto> findById(Long id) {
    BaseResponse<RoleDto> response = new BaseResponse<>();
    Optional<RoleEntity> check = roleRepository.findById(id);
    if (check.isEmpty()) {
      response.setMessage(HTTP_MESSAGE.FAILED);
      response.setCode(HttpStatus. NOT_FOUND.value());
      return response;
    }
    RoleDto roleDto = roleMapper.toDto(check.get());
    response.setData(roleDto);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    return response;
  }

  @Override
  public ResponsePage<List<RoleDto>> findByCondition(String code, String name, Pageable pageable) {
    ResponsePage<List<RoleDto>> responsePage = new ResponsePage<>();
    Page<RoleEntity> page = roleRepository.searchRoles(code, name, pageable);
    List<RoleDto> roleDtos = page.getContent().stream().map(roleMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(roleDtos);
    return responsePage;
  }
}
