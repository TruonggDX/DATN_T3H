package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class OrdersDto {
    private Long id;
    private String code;
    private Long quantity;
    private Double price;
    private String status;
    private String nameUser;
    private String address;
    private String notes;
    private Integer ship;
    private Integer sales;
    private String payments;
    private String rate;
    private String nameProduct;
    private Long userId;
    private Long productId;
}
