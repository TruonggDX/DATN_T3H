package edu.t3h.clothes.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderFilterRequest {
    private Long id;
    private String code;
    private Long quantity;
    private Double price;
    private String status;
    private Long productId;
    private Long userId;

}
