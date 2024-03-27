package edu.t3h.clothes.model.request;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ProductFilterRequest {

    private String code;
    private String name;
    private Float price;
    private Integer categoryId ;
    private Integer sizeId;
    private Integer colorId;
    private Integer producerId;
}
