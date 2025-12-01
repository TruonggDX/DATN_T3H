package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.dto.RevenueStatisticsDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.OrderDetailResponse;
import java.util.List;

public interface IOderDetailService {

  BaseResponse<List<OrderDetailResponse>> getAllOrderDetail(Long orderId);

  BaseResponse<OrderDetailDto> createOrderDetail(OrderDetailDto orderDetailDto);

  BaseResponse<Long> totalSoldByProductId(Long productId);

  BaseResponse<List<RevenueStatisticsDTO>> getRevenueByDay();
  BaseResponse<List<RevenueStatisticsDTO>> getRevenueByMonth();
  BaseResponse<List<RevenueStatisticsDTO>> getRevenueByYear();
}
