package edu.t3h.clothes.controller.auth;

import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthController {
    @Autowired
    private IUserService iUserService;

    @GetMapping(value = {"/","/login"})
    public String loginPage(){
        return "/auth/login";
    }
    @GetMapping("/registers")
    public String register(){
        return "/auth/register";
    }

    @GetMapping(value = "/process-after-login")
    public String processAfterLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDTO userDto= iUserService.findUserByUsername(username);
        if (CollectionUtils.isEmpty(userDto.getRoleDtos())){
            return "redirect:/logout";
        }
        boolean isAdmin = false;
        boolean isUser = false;
        for (int i = 0; i < userDto.getRoleDtos().size(); i++) {
            RoleDTO roleDto = userDto.getRoleDtos().get(i);
            if (Constant.ROLE_ADMIN.equalsIgnoreCase(roleDto.getName())){
                isAdmin=true;
            }
            if (Constant.ROLE_USER.equalsIgnoreCase(roleDto.getName())){
                isUser=true;
            }

        }
        if (isAdmin){
            return "redirect:/admin";
        }
        if (isUser){
            return "redirect:/user";
        }
        return "redirect:/logout";
    }
}
