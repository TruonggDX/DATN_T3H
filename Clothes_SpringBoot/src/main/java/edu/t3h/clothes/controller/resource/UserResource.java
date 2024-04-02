package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserResource {
    @Autowired
    private IUserService iUserService;
    @Autowired
    private UserEntityRepository repository;
    @GetMapping("/list")
    public ResponseEntity<BaseResponse<List<UserDTO>>> getAllUsersWithRoles() {
        BaseResponse<List<UserDTO>> response = iUserService.getAll();
        return ResponseEntity.ok(response);
    }
    @GetMapping("/search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        UserDTO userDTO = iUserService.findUserById(id);
        if (userDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,userDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
    }
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?>delete(@PathVariable Long userId) {
        BaseResponse<?> response = iUserService.deleteAccount(userId);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }
    @PostMapping("/create")
    public BaseResponse<?> createAccount(@RequestBody UserDTO userDTO) {
        BaseResponse<?> response = iUserService.createAccount(userDTO);
        return response;
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<BaseResponse<UserDTO>> updateUser(@PathVariable Long userId, @RequestBody UserDTO updatedUser) {
        BaseResponse<UserDTO> response = iUserService.updateUser(userId, updatedUser);
        return ResponseEntity.status(response.getCode()).body(response);
    }
}
