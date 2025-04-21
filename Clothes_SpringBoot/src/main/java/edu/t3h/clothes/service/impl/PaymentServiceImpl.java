package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.entity.PaymentEntity;
import edu.t3h.clothes.mapper.PaymentMapper;
import edu.t3h.clothes.model.dto.PaymentDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.repository.PaymentRepository;
import edu.t3h.clothes.service.IPaymentService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements IPaymentService {

  private final PaymentRepository paymentRepository;
  private final PaymentMapper paymentMapper;
  private final OrderRepository orderRepository;

  @Override
  public ResponsePage<List<PaymentDto>> getAllPayments(Pageable pageable) {
    ResponsePage<List<PaymentDto>> responsePage = new ResponsePage<>();
    Page<PaymentEntity> page = paymentRepository.findAllByDeletedFalse(pageable);
    List<PaymentDto> paymentDtos = page.getContent().stream().map(paymentMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(paymentDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<PaymentDto> createPayment(PaymentDto paymentDto) {
    BaseResponse<PaymentDto> response = new BaseResponse<>();
    Optional<OrdersEntity> ordersEntity = orderRepository.findById(paymentDto.getOrderId());
    if (ordersEntity.isEmpty()) {
      response.setMessage(HTTP_MESSAGE.FAILED);
      response.setCode(HttpStatus.NOT_FOUND.value());
      return response;
    }
    PaymentEntity paymentEntity = paymentMapper.toEntity(paymentDto);
    paymentEntity.setDeleted(false);
    paymentEntity.setOrdersEntity(ordersEntity.get());
    paymentRepository.save(paymentEntity);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    response.setData(paymentMapper.toDto(paymentEntity));
    return response;
  }
}
