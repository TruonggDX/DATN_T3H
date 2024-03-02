package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
