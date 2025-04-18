package edu.t3h.clothes.model.request;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class ProductFilterRequest {

    private String code;
    private String name;
    private Float price;
    private Integer categoryId;
    private List<Integer> colorId;
    private List<Integer> sizeId;
    private Integer producerId;
}
