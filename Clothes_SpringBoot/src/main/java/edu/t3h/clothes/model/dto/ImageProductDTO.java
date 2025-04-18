package edu.t3h.clothes.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageProductDTO {
    private Long id;
    private String url;
    private Long productId;

}
