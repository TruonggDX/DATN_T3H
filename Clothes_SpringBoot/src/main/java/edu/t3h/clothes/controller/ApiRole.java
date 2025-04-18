package edu.t3h.clothes.controller;

import edu.t3h.clothes.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
public class ApiRole {
    private final IRoleService iRoleService;
}
