package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.mapper.OrderMapper;
import edu.t3h.clothes.model.dto.OrderDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.service.IOrderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderImpl implements IOrderService {

  private final OrderRepository orderRepository;
  private final OrderMapper orderMapper;
  private final AccountRepository accountRepository;

  @Override
  public ResponsePage<List<OrderDto>> getAllOrders(Pageable pageable) {
    return null;
  }

  @Override
  public BaseResponse<OrderDto> createOrder(OrderDto orderDto) {
    return null;
  }

  @Override
  public BaseResponse<OrderDto> updateOrder(Long id, OrderDto orderDto) {
    return null;
  }

  @Override
  public BaseResponse<OrderDto> deleteOrder(Long id) {
    return null;
  }

  @Override
  public BaseResponse<OrderDto> getOrderById(Long id) {
    return null;
  }

  @Override
  public BaseResponse<OrderDto> updateStatus(Long id, String status) {
    return null;
  }

  @Override
  public ResponsePage<List<OrderDto>> findByCondition(String code, String status,
      Pageable pageable) {
    return null;
  }

  @Override
  public ResponsePage<List<OrderDto>> getOderByAccount(Pageable pageable) {
    return null;
  }
}
