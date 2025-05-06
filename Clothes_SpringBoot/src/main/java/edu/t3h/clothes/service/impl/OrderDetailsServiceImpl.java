package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.OrderDetailsEntity;
import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.mapper.OrderDetailMapper;
import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.OrderDetailRepository;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.service.IOderDetailService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailsServiceImpl implements IOderDetailService {

  private final OrderDetailRepository orderDetailRepository;
  private final OrderRepository orderRepository;
  private final OrderDetailMapper orderDetailMapper;

  @Override
  public BaseResponse<List<OrderDetailDto>> getAllOrderDetail(Long orderId) {
    BaseResponse<List<OrderDetailDto>> response = new BaseResponse<>();

    if (orderId == null) {
      response.setCode(HttpStatus.BAD_REQUEST.value());
      response.setMessage("Thiếu orderId!");
      return response;
    }

    List<OrderDetailsEntity> details = orderDetailRepository.findAllOrderDetails()
        .stream()
        .filter(e -> e.getOrder() != null && e.getOrder().getId().equals(orderId))
        .toList();

    List<OrderDetailDto> dtos = details.stream()
        .map(orderDetailMapper::toDto).toList();

    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(dtos);
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDetailDto> createOrderDetail(OrderDetailDto orderDetailDto) {
    BaseResponse<OrderDetailDto> response = new BaseResponse<>();

    if (orderDetailDto.getOrderId() == null) {
      response.setCode(HttpStatus.BAD_REQUEST.value());
      response.setMessage("Thiếu orderId!");
      return response;
    }

    Optional<OrdersEntity> orderOpt = orderRepository.findById(orderDetailDto.getOrderId());
    if (orderOpt.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy đơn hàng với ID: " + orderDetailDto.getOrderId());
      return response;
    }

    OrderDetailsEntity entity = orderDetailMapper.toEntity(orderDetailDto);
    entity.setDeleted(false);
    entity.setOrder(orderOpt.get());

    orderDetailRepository.save(entity);

    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderDetailMapper.toDto(entity));
    return response;
  }
}
