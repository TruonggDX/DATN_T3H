package edu.t3h.clothes.model.request;

import lombok.Data;

@Data
public class ProductFilterRequest {
    private String code;
    private String name;
    private Float price;
    private Integer categoryId ;
//    private Integer sizeId;
}
