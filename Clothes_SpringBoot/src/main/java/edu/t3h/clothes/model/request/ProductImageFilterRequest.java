package edu.t3h.clothes.model.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductImageFilterRequest {
    private Long productId;
    public ProductImageFilterRequest(Long productId) {
        this.productId = productId;
    }
}
