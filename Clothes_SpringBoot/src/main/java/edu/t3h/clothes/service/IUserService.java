package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.ChangePassword;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IUserService {
    UserDTO findUserByUsername(String username);
    BaseResponse<?> createAccount(UserDTO userDTO);

    BaseResponse<Page<UserDTO>> getAll(int page, int size);
    BaseResponse<UserDTO> updateUser(Long userId, UserDTO updatedUser);

    UserDTO findUserById(Long id);

    BaseResponse<?> deleteAccount(Long id);

    BaseResponse<UserDTO> checkLoyalCustomer();

    BaseResponse<UserDTO> getUser();
    BaseResponse<UserDTO> updateProfile(UserDTO userDTO);

    BaseResponse<Integer> countAccount();

    BaseResponse<Page<UserDTO>> searchByCondition(String condition, int page, int size);


    BaseResponse<Void> updatePass(long id, ChangePassword changePassword);

    BaseResponse<UserDTO> getUserByName(Long id);
}
