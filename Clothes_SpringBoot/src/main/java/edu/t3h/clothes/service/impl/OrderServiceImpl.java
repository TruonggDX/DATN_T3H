package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.mapper.OrderMapper;
import edu.t3h.clothes.model.dto.OrderDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.OrderRepository;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.IOrderService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
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

  @Override
  public ResponsePage<List<OrderDto>> getAllOrders(Pageable pageable) {
    Page<OrdersEntity> page = orderRepository.findAllOrders(pageable);
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
    order.setCode(orderDto.getCode());
    order.setStatus(orderDto.getStatus());
    order.setAddress(orderDto.getAddress());
    order.setNotes(orderDto.getNotes());
    order.setShip(orderDto.getShip());

    if (orderDto.getAccountId() != null) {
      Optional<AccountEntity> acc = accountRepository.findById(orderDto.getAccountId());
      acc.ifPresent(order::setAccount);
    }

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
    if (order.filter(o -> !o.getDeleted()).isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(ORDER_NOT_FOUND_MESSAGE + id);
      return response;
    }

    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(order.get()));
    return response;
  }

  @Override
  @Transactional
  public BaseResponse<OrderDto> updateStatus(Long id, String status) {
    BaseResponse<OrderDto> response = new BaseResponse<>();
    Optional<OrdersEntity> order = orderRepository.findById(id);
    if (order.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(ORDER_NOT_FOUND_MESSAGE + id);
      return response;
    }

    OrdersEntity entity = order.get();
    entity.setStatus(status);
    orderRepository.save(entity);

    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(orderMapper.toDto(entity));
    return response;
  }

  @Override
  public ResponsePage<List<OrderDto>> findByCondition(String code, String status,
      Pageable pageable) {
    Page<OrdersEntity> page = orderRepository.findOrderByCondition(code, status, pageable);
    List<OrderDto> dtos = page.getContent().stream().map(orderMapper::toDto).toList();

    ResponsePage<List<OrderDto>> response = new ResponsePage<>();
    response.setContent(dtos);
    response.setPageNumber(pageable.getPageNumber());
    response.setPageSize(pageable.getPageSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }

  @Override
  public ResponsePage<List<OrderDto>> getOderByAccount(Pageable pageable) {
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<AccountEntity> account = accountRepository.findByEmail(email);
    ResponsePage<List<OrderDto>> response = new ResponsePage<>();

    if (account.isEmpty()) {
      response.setContent(List.of());
      response.setTotalElements(0);
      response.setTotalPages(0);
      return response;
    }

    Page<OrdersEntity> page = orderRepository.findAllByAccountIdAndDeletedFalse(
        account.get().getId(), pageable);
    List<OrderDto> dtos = page.getContent().stream().map(orderMapper::toDto).toList();
    response.setContent(dtos);
    response.setPageNumber(pageable.getPageNumber());
    response.setPageSize(pageable.getPageSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }
}
