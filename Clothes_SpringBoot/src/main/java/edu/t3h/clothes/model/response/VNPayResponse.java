package edu.t3h.clothes.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VNPayResponse {
    private String code;
    private String message;
    private String paymentUrl;
}
