package edu.t3h.clothes.controller;

import edu.t3h.clothes.service.IAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class ApiUser {
    private IAccountService iAccountService;

}
