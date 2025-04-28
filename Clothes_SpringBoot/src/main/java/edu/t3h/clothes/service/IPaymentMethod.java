package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.response.BaseResponse;

public interface IPaymentMethod {

  BaseResponse<PaymentDto> createPayment(PaymentDto paymentDto);
}
