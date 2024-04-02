package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class OrdersDTO {
    private Long id;
    private String code;
    private Long quantity;
    private Double price;
    private String status;
    private String name;
    private String address;
    private String notes;
    private Integer ship;
    private Integer sales;
    private String payments;
    private String rate;
    private String nameProduct;
}
