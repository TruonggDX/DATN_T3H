package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
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
//    @PostMapping("/create")
//    public ResponseEntity<BaseResponse<UserDTO>> createUser(@RequestBody UserDTO userDTO) {
//        BaseResponse<?> response = iUserService.creatUserDto(userDTO);
//        return ResponseEntity.ok().body((BaseResponse<UserDTO>) response);
//    }

//    @PostMapping("/register")
//    public ResponseEntity<BaseResponse<UserDTO>> registerUser(@RequestParam String username, @RequestParam String password) {
//        BaseResponse<UserDTO> response = iUserService.registerUserWithRole(username, password);
//        return ResponseEntity.status(response.getCode()).body(response);
//    }
}
