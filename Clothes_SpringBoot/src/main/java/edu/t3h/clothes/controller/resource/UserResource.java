package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.ChangePassword;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserResource {
    @Autowired
    private IUserService iUserService;
    @GetMapping("/list")
    public ResponseEntity<BaseResponse<Page<UserDTO>>> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

        return ResponseEntity.ok(iUserService.getAll(page, size));
    }

    @GetMapping("/search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        UserDTO userDTO = iUserService.findUserById(id);
        if (userDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, userDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }
    @GetMapping("/searchByCondition/{condition}")
    public BaseResponse<Page<UserDTO>> searchUsersByCondition(@PathVariable String condition,
                                                              @RequestParam(name = "page", required = false, defaultValue = "0") int page,
                                                              @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

        BaseResponse<Page<UserDTO>> userDto = iUserService.searchByCondition(condition, page, size);
        if (userDto.getData() != null && !userDto.getData().isEmpty()) {
            BaseResponse<Page<UserDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(userDto.getData());
            return response;
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }


    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> delete(@PathVariable Long userId) {
        BaseResponse<?> response = iUserService.deleteAccount(userId);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }

    @GetMapping("/loyal-status")
    public ResponseEntity<BaseResponse<UserDTO>> checkLoyalCustomer() {
        BaseResponse<UserDTO> response = iUserService.checkLoyalCustomer();

        HttpStatus httpStatus = HttpStatus.valueOf(response.getCode());

        return new ResponseEntity<>(response, httpStatus);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<BaseResponse<UserDTO>> updateUser(@PathVariable Long userId, @RequestBody UserDTO updatedUser) {
        BaseResponse<UserDTO> response = iUserService.updateUser(userId, updatedUser);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<BaseResponse<UserDTO>> updateProfile(UserDTO userDTO) {
        BaseResponse<UserDTO> response = iUserService.updateProfile(userDTO);
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody UserDTO userDTO){
        BaseResponse<?> createAccount = iUserService.createAccount(userDTO);
        if (createAccount != null && createAccount.getCode() == HttpStatus.OK.value()){
            return ResponseEntity.ok().body(createAccount);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createAccount != null ? createAccount.getMessage(): "ailed to create Account ");
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<BaseResponse<UserDTO>> getCurrentUser() {
        BaseResponse<UserDTO> response = iUserService.getUser();

        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response);
        }
    }

    @GetMapping("/countAccount")
    public ResponseEntity<BaseResponse<Integer>> countCartItems() {
        BaseResponse<Integer> response = iUserService.countAccount();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updatePass/{id}")
    public void updatePass(@PathVariable Long id, @RequestBody ChangePassword changePassword) {
        iUserService.updatePass(id,changePassword);
    }
}
