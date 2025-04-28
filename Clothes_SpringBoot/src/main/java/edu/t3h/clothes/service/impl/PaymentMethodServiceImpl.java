package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.entity.PaymentEntity;
import edu.t3h.clothes.mapper.PaymentMapper;
import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.repository.PaymentRepository;
import edu.t3h.clothes.service.IPaymentMethod;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PaymentMethodServiceImpl implements IPaymentMethod {

  private PaymentRepository paymentRepository;
  private PaymentMapper paymentMapper;
  private OrderRepository orderRepository;


  @Override
  public BaseResponse<PaymentDto> createPayment(PaymentDto paymentDto) {
    BaseResponse<PaymentDto> response = new BaseResponse<>();
    Optional<OrdersEntity> check = orderRepository.findById(paymentDto.getOrderId());
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Order not found with id " + paymentDto.getOrderId());
      return response;
    }
    PaymentEntity paymentEntity = paymentMapper.toEntity(paymentDto);
    paymentEntity.setDeleted(false);
    paymentEntity.setOrdersEntity(check.get());
    paymentRepository.save(paymentEntity);
    response.setCode(HttpStatus.CREATED.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(paymentMapper.toDto(paymentEntity));
    return response;
  }
}
