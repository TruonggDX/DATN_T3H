package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.OrderDto;
import edu.t3h.clothes.model.request.OrderRequest;
import edu.t3h.clothes.model.request.UpdateStatusRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.OrderResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IOrderService {

  ResponsePage<List<OrderDto>> getAllOrders(String code, String status,Pageable pageable);

  BaseResponse<OrderDto> createOrder(OrderDto orderDto);

  BaseResponse<OrderDto> updateOrder(Long id, OrderDto orderDto);

  BaseResponse<OrderDto> deleteOrder(Long id);

  BaseResponse<OrderDto> getOrderById(Long id);

  BaseResponse<OrderDto> updateStatus(Long id, UpdateStatusRequest request);

  ResponsePage<List<OrderDto>> getOderByAccount(Pageable pageable);

  BaseResponse<Long> getTotalOrder();

  BaseResponse<OrderDto> updateOrderByCustomer(Long id, OrderRequest request);

  BaseResponse<OrderDto> cancelOrder(Long id);

  BaseResponse<Boolean> checkProductSoldByAccount(Long productId);

  BaseResponse<List<OrderResponse>> getOrderRecent();

}
