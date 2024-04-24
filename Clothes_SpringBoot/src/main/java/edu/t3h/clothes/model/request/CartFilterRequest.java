package edu.t3h.clothes.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartFilterRequest {
    private Long productId;
    private Long quantity;
}
