package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.OrderDetailsEntity;
import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VariantEntity;
import edu.t3h.clothes.mapper.OrderDetailMapper;
import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.dto.RevenueStatisticsDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.OrderDetailResponse;
import edu.t3h.clothes.repository.OrderDetailRepository;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.VariantRepository;
import edu.t3h.clothes.service.IOderDetailService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailsServiceImpl implements IOderDetailService {

  private final OrderDetailRepository orderDetailRepository;
  private final OrderRepository orderRepository;
  private final OrderDetailMapper orderDetailMapper;
  private final ProductRepository productRepository;
  private final VariantRepository variantRepository;

  @Override
  public BaseResponse<List<OrderDetailResponse>> getAllOrderDetail(Long orderId) {
    BaseResponse<List<OrderDetailResponse>> response = new BaseResponse<>();
    List<OrderDetailsEntity> details = orderDetailRepository.findAllOrderDetails(orderId);
    List<OrderDetailResponse> dtos = details.stream().map(orderDetailMapper::toResponse).toList();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(dtos);
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDetailDto> createOrderDetail(OrderDetailDto orderDetailDto) {
    BaseResponse<OrderDetailDto> response = new BaseResponse<>();
    Optional<OrdersEntity> orderOpt = orderRepository.findById(orderDetailDto.getOrderId());
    if (orderOpt.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy đơn hàng với ID: " + orderDetailDto.getOrderId());
      return response;
    }
    Optional<ProductEntity> productCheck = productRepository.findById(orderDetailDto.getProductId());
    if (productCheck.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy product với ID: " + orderDetailDto.getProductId());
      return response;
    }
    Optional<VariantEntity> productVariant = variantRepository.findById(orderDetailDto.getVariantId());
    if (productVariant.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy variant với ID: " + orderDetailDto.getVariantId());
      return response;
    }
    OrderDetailsEntity entity = orderDetailMapper.toEntity(orderDetailDto);
    entity.setDeleted(false);
    entity.setOrder(orderOpt.get());
    entity.setProduct(productCheck.get());
    entity.setVariant(productVariant.get());
    orderDetailRepository.save(entity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderDetailMapper.toDto(entity));
    return response;
  }

  @Override
  public BaseResponse<Long> totalSoldByProductId(Long productId) {
    BaseResponse<Long> response = new BaseResponse<>();
    Long total = orderDetailRepository.getTotalSoldByProductId(productId);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(total);
    return response;
  }

  @Override
  public BaseResponse<List<RevenueStatisticsDTO>> getRevenueByDay() {
    BaseResponse<List<RevenueStatisticsDTO>> response = new BaseResponse<>();
    List<Object[]> result = orderDetailRepository.revenueByDay();
    List<RevenueStatisticsDTO> dtos = result.stream()
        .map(r -> new RevenueStatisticsDTO(r[0].toString(), ((Number) r[1]).doubleValue()))
        .toList();

    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(dtos);
    return response;
  }

  @Override
  public BaseResponse<List<RevenueStatisticsDTO>> getRevenueByMonth() {
    BaseResponse<List<RevenueStatisticsDTO>> response = new BaseResponse<>();
    List<Object[]> result = orderDetailRepository.revenueByMonth();
    List<RevenueStatisticsDTO> dtos = result.stream()
        .map(r -> new RevenueStatisticsDTO(r[0].toString(), ((Number) r[1]).doubleValue()))
        .toList();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(dtos);
    return response;
  }

  @Override
  public BaseResponse<List<RevenueStatisticsDTO>> getRevenueByYear() {
    BaseResponse<List<RevenueStatisticsDTO>> response = new BaseResponse<>();
    List<Object[]> result = orderDetailRepository.revenueByYear();
    List<RevenueStatisticsDTO> dtos = result.stream()
        .map(r -> new RevenueStatisticsDTO(r[0].toString(), ((Number) r[1]).doubleValue()))
        .toList();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(dtos);
    return response;  }
}
