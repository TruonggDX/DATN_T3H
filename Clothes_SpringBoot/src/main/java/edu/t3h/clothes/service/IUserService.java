package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;

import java.util.List;

public interface IUserService {
    UserDTO findUserByUsername(String username);
    BaseResponse<List<UserDTO>> getAll();

}
