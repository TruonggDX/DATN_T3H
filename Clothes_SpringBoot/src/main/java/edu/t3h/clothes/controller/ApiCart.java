package edu.t3h.clothes.controller;

import edu.t3h.clothes.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class ApiCart {
    private final ICartService iCartService;

}
