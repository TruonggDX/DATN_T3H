package edu.t3h.clothes.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartFilterRequest {
    private Long id;
    private Double price;
    private Long number;
    private Double total;


    private Long userId;
    private Long productId;
    private String nameUser;
    private String nameProduct;
}
