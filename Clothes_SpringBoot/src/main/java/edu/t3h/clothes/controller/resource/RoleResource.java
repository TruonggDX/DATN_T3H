package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IRoleService;
import edu.t3h.clothes.service.ISizeService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleResource {
    @Autowired
    private  IRoleService iRoleService;
    @GetMapping("/list")
    public BaseResponse<List<RoleDTO>> getAllSize() {
        BaseResponse<List<RoleDTO>> response = iRoleService.getAll();
        return response;
    }

    @PostMapping("/create")
    public BaseResponse<?> createSize(@RequestBody RoleDTO roleDTO) {
        BaseResponse<?> response = iRoleService.creatRole(roleDTO);
        return response;
    }

    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteSize(@PathVariable Long id) {
        BaseResponse<?> response = iRoleService.deleteRole(id);
        return response;
    }

    @PostMapping("update/{id}")
    public BaseResponse<?> updateSize(@PathVariable Long id, @RequestBody RoleDTO roleDTO) {
        BaseResponse<?> response = iRoleService.updateRole(id, roleDTO);
        return response;
    }

    @GetMapping("search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        RoleDTO roleDTO = iRoleService.findRoleById(id);
        if (roleDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, roleDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }

}
