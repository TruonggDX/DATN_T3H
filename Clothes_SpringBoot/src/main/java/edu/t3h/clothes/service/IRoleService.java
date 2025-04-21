package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.RoleDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IRoleService {
  ResponsePage<List<RoleDto>> getAllRoles(Pageable pageable);
  BaseResponse<RoleDto> addRole(RoleDto role);
  BaseResponse<RoleDto> updateRole(Long id, RoleDto role);
  BaseResponse<RoleDto> deleteRole(Long id);
  BaseResponse<RoleDto> findById(Long id);
  ResponsePage<List<RoleDto>> findByCondition(String code, String name, Pageable pageable);
}
