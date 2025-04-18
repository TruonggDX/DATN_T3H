package edu.t3h.clothes.controller;

import edu.t3h.clothes.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ApiProduct {

  private final IProductService productService;

}
