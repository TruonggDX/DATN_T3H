package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;

import java.util.List;

public interface IRoleService {
    BaseResponse<List<RoleDTO>> getAll();
    BaseResponse<?> creatRole(RoleDTO roleDTO);
    BaseResponse<?> deleteRole(Long id);
    RoleDTO findRoleById(Long id);
    BaseResponse<?> updateRole(Long id,RoleDTO roleDTO);
}
