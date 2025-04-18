package edu.t3h.clothes.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartDto {
    private Long id;
    private Double price;
    private Long number;
    private Double total;

    private Long productId;
    private List<Long> sizeId;
    private List<Long> colorId;



}
