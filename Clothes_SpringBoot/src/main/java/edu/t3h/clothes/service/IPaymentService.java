package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IPaymentService {
  ResponsePage<List<PaymentDto>> getAllPayments(Pageable pageable);
  BaseResponse<PaymentDto> createPayment(PaymentDto paymentDto);
}
