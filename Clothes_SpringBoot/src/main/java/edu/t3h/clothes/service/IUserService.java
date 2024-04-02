package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.RegisterAccountUserDTO;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;

import java.util.List;

public interface IUserService {
    UserDTO findUserByUsername(String username);
    BaseResponse<List<UserDTO>> getAll();
    UserDTO findUserById(Long id);
    BaseResponse<UserDTO> updateUser(Long userId, UserDTO updatedUser);
    BaseResponse<?> deleteAccount(Long id);
    BaseResponse<UserDTO> createAccount(UserDTO userDTO);
}
