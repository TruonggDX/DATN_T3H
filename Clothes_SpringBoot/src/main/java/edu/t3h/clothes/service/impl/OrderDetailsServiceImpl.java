package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.mapper.OrderDetailMapper;
import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.OrderDetailRepository;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.service.IOderDetailService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailsServiceImpl implements IOderDetailService {

  private final OrderDetailRepository orderDetailRepository;
  private final OrderDetailMapper orderDetailMapper;
  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;

  @Override
  public BaseResponse<List<OrderDetailDto>> getAllOrderDetail(Long orderId) {
    return null;
  }

  @Override
  public BaseResponse<OrderDetailDto> createOrderDetail(OrderDetailDto orderDetailDto) {
    return null;
  }
}
