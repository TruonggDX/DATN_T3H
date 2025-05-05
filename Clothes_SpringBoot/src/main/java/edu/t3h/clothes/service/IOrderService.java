package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.OrderDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IOrderService {

  ResponsePage<List<OrderDto>> getAllOrders(Pageable pageable);

  BaseResponse<OrderDto> createOrder(OrderDto orderDto);

  BaseResponse<OrderDto> updateOrder(Long id, OrderDto orderDto);

  BaseResponse<OrderDto> deleteOrder(Long id);

  BaseResponse<OrderDto> getOrderById(Long id);

  BaseResponse<OrderDto> updateStatus(Long id, String status);

  ResponsePage<List<OrderDto>> findByCondition(String code, String status, Pageable pageable);

  ResponsePage<List<OrderDto>> getOderByAccount(Pageable pageable);
}
