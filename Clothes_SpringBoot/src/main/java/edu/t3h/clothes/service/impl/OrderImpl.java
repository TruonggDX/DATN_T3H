package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.OrderFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.OrdersRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.OrderService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderImpl implements OrderService {

    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserEntityRepository userEntityRepository;

    @Override
    public BaseResponse<Page<OrdersDTO>> getAll(OrderFilterRequest filterRequest, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrdersEntity> ordersEntities = ordersRepository.findAllByFilter(filterRequest, pageable);
        if (ordersEntities != null && !ordersEntities.isEmpty()) {
            List<OrdersDTO> ordersDTOList = ordersEntities.getContent().stream().map(ordersEntity -> {
                OrdersDTO ordersDTO = modelMapper.map(ordersEntity, OrdersDTO.class);
                ordersDTO.setNameUser(ordersEntity.getUser().getName());
                ordersDTO.setNameProduct(ordersDTO.getNameProduct());

                return ordersDTO;
            }).collect(Collectors.toList());

            Page<OrdersDTO> pageData = new PageImpl<>(ordersDTOList, pageable, ordersEntities.getTotalElements());
            BaseResponse<Page<OrdersDTO>> response = new BaseResponse<>();
            response.setCode(200);
            response.setMessage("success");
            response.setData(pageData);
            return response;
        } else {
            BaseResponse<Page<OrdersDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData(new PageImpl<>(Collections.emptyList()));
            return response;
        }
    }

    @Override
    public BaseResponse<?> creatOrder(OrdersDTO ordersDTO) {
        BaseResponse baseResponse = new BaseResponse<>();

        Optional<UserEntity> userEntityOptional = userEntityRepository.findById(ordersDTO.getUserId());
        if (userEntityOptional.isEmpty()) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("User does not exist in the system");
            return baseResponse;
        }

        Optional<ProductEntity> productEntityOptional = productRepository.findById(ordersDTO.getProductId());
        if (productEntityOptional.isEmpty()) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("Product does not exist in the system");
            return baseResponse;
        }

        String orderCode = generateOrderCode();
        OrdersEntity ordersEntity = modelMapper.map(ordersDTO, OrdersEntity.class);
        ordersEntity.setUser(userEntityOptional.get());
        ordersEntity.setProduct(productEntityOptional.get());
        LocalDateTime now = LocalDateTime.now();
        ordersEntity.setCreatedDate(now);
        ordersEntity.setDeleted(false);
        ordersEntity.setCode(orderCode);
        ordersRepository.save(ordersEntity);
        baseResponse.setMessage("Order created successfully");
        baseResponse.setCode(HttpStatus.OK.value());
        baseResponse.setData(ordersDTO);
        return baseResponse;
    }

    private String generateOrderCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }
        return sb.toString();
    }
    @Override
    public BaseResponse<?> deleteOrder(Long id) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<OrdersEntity> optionalOrdersEntity = ordersRepository.findById(id);
        if (optionalOrdersEntity.isPresent()) {
            OrdersEntity orderEntity = optionalOrdersEntity.get();

            orderEntity.setDeleted(true);
            ordersRepository.save(orderEntity);

            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        return response;
    }
    @Override
    public OrdersDTO findOrderById(Long id) {
        Optional<OrdersEntity> orderEntityOp = ordersRepository.findById(id);
        OrdersEntity orderEntity = null;
        BaseResponse<OrdersDTO> response;
        if (orderEntityOp.isEmpty()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, OrdersDTO.class);
        }
        orderEntity = orderEntityOp.get();
        if (orderEntity.getDeleted()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, OrdersDTO.class);
        }
        return modelMapper.map(orderEntity, OrdersDTO.class);
    }
    @Override
    public BaseResponse<?> updateOrder(Long id, OrdersDTO ordersDTO) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<OrdersEntity> optionalOrdersEntity = ordersRepository.findById(id);
        if (optionalOrdersEntity.isPresent()) {
            OrdersEntity orderEntity = optionalOrdersEntity.get();
            orderEntity.setCode(ordersDTO.getCode());
            orderEntity.setQuantity(ordersDTO.getQuantity());
            orderEntity.setPrice(ordersDTO.getPrice());
            orderEntity.setAddress(ordersDTO.getAddress());
            orderEntity.setNotes(ordersDTO.getNotes());
            orderEntity.setStatus(ordersDTO.getStatus());
            Optional<ProductEntity> productEntityOptional = productRepository.findById(ordersDTO.getProductId());
            if (productEntityOptional.isPresent()) {
                orderEntity.setProduct(productEntityOptional.get());
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("product not found with id " + ordersDTO.getProductId());
                return response;
            }

            Optional<UserEntity> userEntity = userEntityRepository.findById(ordersDTO.getUserId());

            if (userEntity.isPresent()) {
                orderEntity.setUser(userEntity.get());
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("user not found with id " + ordersDTO.getUserId());
                return response;
            }
            ordersRepository.save(orderEntity);
            response.setCode(HttpStatus.OK.value());
            response.setMessage("Update order with id " + id + " successful");
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("order with id " + id + " not found");
        }
        return response;
    }

    @Override
    public BaseResponse<List<OrdersDTO>> searchOrderCondition(String condition) {
        List<OrdersEntity> orderEntities = ordersRepository.searchOrders(condition);
        List<OrdersDTO> orderDTO = orderEntities.stream()
                .map(categoryEntity -> modelMapper.map(categoryEntity, OrdersDTO.class))
                .collect(Collectors.toList());
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, orderDTO);
    }

    @Override
    public BaseResponse<Long> countOrdersInSystem() {
        Long cartOrder = ordersRepository.countOrders();
        BaseResponse<Long> response = new BaseResponse<>();
        response.setData(cartOrder);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
