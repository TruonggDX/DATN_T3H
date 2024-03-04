package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserResource {

    private final IUserService iUserService;
    public UserResource(IUserService iUserService){
        this.iUserService = iUserService;
    }
    @GetMapping("/list_user")
    public BaseResponse<List<UserDTO>> getAllUser(){
        BaseResponse<List<UserDTO>> response = iUserService.getAll();
        return response;
    }
    @PostMapping("/add_user")
    public BaseResponse<?> creatUser(@RequestBody UserDTO userDTO){
        BaseResponse<?> response =iUserService.creatUser(userDTO);
        return response;
    }
    @PostMapping("delete/{id}")
    public BaseResponse<?> deleteUser(@PathVariable Long id){
        BaseResponse<?> response = iUserService.deleteUser(id);
        return response;
    }

}
