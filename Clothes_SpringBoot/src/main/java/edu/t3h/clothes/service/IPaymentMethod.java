package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.BrandRevenueDTO;
import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.dto.PaymentRevenueDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import java.util.List;

public interface IPaymentMethod {

  BaseResponse<PaymentDto> createPayment(PaymentDto paymentDto);

  BaseResponse<PaymentDto> getByOrderId(Long orderId);

  BaseResponse<List<PaymentRevenueDTO>> getPaymentRevenue();

}
