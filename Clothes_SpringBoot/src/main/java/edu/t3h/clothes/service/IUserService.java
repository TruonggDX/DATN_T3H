package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;

import java.util.List;

public interface IUserService {
    BaseResponse<List<UserDTO>> getAll();
    BaseResponse<?> creatUser(UserDTO userDTO);
    UserDTO findById(Long id);
    BaseResponse<?> deleteUser(Long id);
    BaseResponse<?> updateUser( Long id, UserDTO userDTO);
}
