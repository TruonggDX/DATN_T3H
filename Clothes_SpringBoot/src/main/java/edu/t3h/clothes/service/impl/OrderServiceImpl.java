package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.OrderDetailsEntity;
import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VariantEntity;
import edu.t3h.clothes.mapper.OrderMapper;
import edu.t3h.clothes.model.dto.OrderDto;
import edu.t3h.clothes.model.dto.ProductDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.request.OrderRequest;
import edu.t3h.clothes.model.request.UpdateStatusRequest;
import edu.t3h.clothes.model.response.AttributeValuesResponse;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.OrderResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.OrderDetailRepository;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.repository.VariantRepository;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.IOrderService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

  private final OrderRepository orderRepository;
  private final OrderMapper orderMapper;
  private final AccountRepository accountRepository;
  private static final String ORDER_NOT_FOUND_MESSAGE = "Không tìm thấy đơn hàng với id: ";
  private final JwtService jwtService;
  private final VariantRepository variantRepository;
  private final OrderDetailRepository orderDetailRepository;

  @Override
  public ResponsePage<List<OrderDto>> getAllOrders(String code, String status, Pageable pageable) {
    Page<OrdersEntity> page = orderRepository.findOrderByCondition(code, status, pageable);
    List<OrderDto> orders = page.getContent().stream().map(orderMapper::toDto).toList();
    ResponsePage<List<OrderDto>> response = new ResponsePage<>();
    response.setContent(orders);
    response.setPageNumber(pageable.getPageNumber());
    response.setPageSize(pageable.getPageSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDto> createOrder(OrderDto orderDto) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<AccountEntity> account = accountRepository.findByEmail(email);
    if (account.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy accountId: " + account);
      return response;
    }
    OrdersEntity entity = orderMapper.toEntity(orderDto);
    entity.setDeleted(false);
    entity.setCode(GenarateCode.generateAccountCode());
    entity.setAccount(account.get());
    orderRepository.save(entity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(entity));
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDto> updateOrder(Long id, OrderDto orderDto) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    Optional<OrdersEntity> optionalOrder = orderRepository.findById(id);
    if (optionalOrder.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(ORDER_NOT_FOUND_MESSAGE + id);
      return response;
    }
    OrdersEntity order = optionalOrder.get();
    order.setDeleted(false);
    order.setStatus(orderDto.getStatus());
    order.setAddress(orderDto.getAddress());
    order.setNotes(orderDto.getNotes());
    order.setShip(orderDto.getShip());
    orderRepository.save(order);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(order));
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDto> deleteOrder(Long id) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    Optional<OrdersEntity> order = orderRepository.findById(id);
    if (order.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy đơn hàng: " + id);
      return response;
    }
    OrdersEntity entity = order.get();
    entity.setDeleted(true);
    orderRepository.save(entity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(entity));
    return response;
  }

  @Override
  public BaseResponse<OrderDto> getOrderById(Long id) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    Optional<OrdersEntity> order = orderRepository.findById(id);
    if (order.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy đơn hàng: " + id);
      return response;
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(order.get()));
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDto> updateStatus(Long id, UpdateStatusRequest request) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    Optional<OrdersEntity> order = orderRepository.findById(id);
    if (order.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(ORDER_NOT_FOUND_MESSAGE + id);
      return response;
    }
    OrdersEntity entity = order.get();
    entity.setStatus(request.getStatus());
    orderRepository.save(entity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(entity));
    return response;
  }

  @Override
  public ResponsePage<List<OrderDto>> getOderByAccount(Pageable pageable) {
    ResponsePage<List<OrderDto>> response = new ResponsePage<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<AccountEntity> account = accountRepository.findByEmail(email);
    if (account.isEmpty()) {
      return null;
    }
    Page<OrdersEntity> page = orderRepository.findAllByAccount(email, pageable);
    List<OrderDto> dtos = page.getContent().stream().map(orderMapper::toDto).toList();
    response.setContent(dtos);
    response.setPageNumber(pageable.getPageNumber());
    response.setPageSize(pageable.getPageSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }

  @Override
  public BaseResponse<Long> getTotalOrder() {
    BaseResponse<Long> response = new BaseResponse<>();
    Long total = orderRepository.countOrders();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(total);
    return response;
  }

  @Override
  public BaseResponse<OrderDto> updateOrderByCustomer(Long id, OrderRequest request) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    Optional<OrdersEntity> order = orderRepository.findById(id);
    if (order.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(ORDER_NOT_FOUND_MESSAGE + id);
      return response;
    }
    OrdersEntity entity = order.get();
    entity.setNotes(request.getNotes());
    entity.setAddress(request.getAddress());
    orderRepository.save(entity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(entity));
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDto> cancelOrder(Long id) {
    BaseResponse<OrderDto> response = new BaseResponse<>();

    OrdersEntity order = orderRepository.findById(id).orElse(null);
    if (order == null) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Không tìm thấy đơn hàng: " + id);
      return response;
    }
    List<OrderDetailsEntity> details = orderDetailRepository.findByOrderId(order.getId());

    for (OrderDetailsEntity detail : details) {
      VariantEntity variant = detail.getVariant();
      if (variant != null) {
        Long currentQuantity = variant.getQuantity();
        Long returnQuantity = detail.getQuantity();
        variant.setQuantity(currentQuantity + returnQuantity);
        variantRepository.save(variant);
      }
    }
    order.setStatus("Đã hủy");
    orderRepository.save(order);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(order));
    return response;
  }

  @Override
  public BaseResponse<Boolean> checkProductSoldByAccount(Long productId) {
    BaseResponse<Boolean> response = new BaseResponse<>();

    AuthDto auth = jwtService.decodeToken();
    String email = auth.getEmail();

    boolean boughtAndCompleted =
        orderDetailRepository.existsCompletedOrderForProduct(productId, email);

    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(boughtAndCompleted);

    return response;
  }

  @Override
  public BaseResponse<List<OrderResponse>> getOrderRecent() {
    BaseResponse<List<OrderResponse>> response = new BaseResponse<>();
    LocalDateTime dateTime = LocalDateTime.now().minusDays(5);
    List<OrdersEntity> orderRecent = orderRepository.getOrderRecent(dateTime);
    List<OrderResponse> orderResponses = orderRecent.stream().map(e -> {
      OrderResponse orderResponse = new OrderResponse();
      orderResponse.setStatus(e.getStatus());
      OrderDetailsEntity detail = orderDetailRepository.findFirstByOrderId(e.getId());
      if (detail != null) {
        if (detail.getProduct() != null) {
          orderResponse.setProductName(detail.getProduct().getName());
          if (detail.getProduct().getCategoryEntity() != null) {
            orderResponse.setCategoryName(detail.getProduct().getCategoryEntity().getName());
          }
          if (detail.getProduct().getImagesEntities() != null && !detail.getProduct().getImagesEntities().isEmpty()) {
            orderResponse.setImageUrl(detail.getProduct().getImagesEntities().get(0).getUrl());
          }

        }
        orderResponse.setPrice(String.valueOf(detail.getPrice()));
      }
      if (detail.getVariant() != null
          && detail.getVariant().getAttributeValues() != null
          && !detail.getVariant().getAttributeValues().isEmpty()) {
        AttributeValuesResponse attr = new AttributeValuesResponse();
        attr.setId(detail.getVariant().getId()); // id của variant
        String joinedValues = detail.getVariant()
            .getAttributeValues()
            .stream()
            .map(v -> v.getValue())
            .collect(Collectors.joining(" - "));
        attr.setValue(joinedValues);
        orderResponse.setAttributeValues(attr);
      }
      return orderResponse;
    }).toList();
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    response.setData(orderResponses);
    return response;
  }

}
