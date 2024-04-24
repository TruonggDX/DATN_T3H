package edu.t3h.clothes.model.response;

import edu.t3h.clothes.model.dto.ProductDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class CartResponse {
    private Long id;
    private Long userId;
    private String name;
    private String code;
    private Long number;
    private Double price;
    private String material;
    private Double total;
    private List<Long> sizeId;
    private List<Long> colorId;
    private Long productId;
    private Long categoryId;
    private Long producerId;
    private String nameSize;
    private String nameColor;
    private Double total_cart;
}
