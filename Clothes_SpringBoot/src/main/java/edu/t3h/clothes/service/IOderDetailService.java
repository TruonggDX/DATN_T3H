package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.response.BaseResponse;
import java.util.List;

public interface IOderDetailService {

  BaseResponse<List<OrderDetailDto>> getAllOrderDetail(Long orderId);
  BaseResponse<OrderDetailDto> createOrderDetail(OrderDetailDto orderDetailDto);
}
