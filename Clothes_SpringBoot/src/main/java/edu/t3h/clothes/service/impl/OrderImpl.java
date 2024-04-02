package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.OrderFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.OrdersRepository;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderImpl implements OrderService {

    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public BaseResponse<Page<OrdersDTO>> getAll(OrderFilterRequest filterRequest, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrdersEntity> ordersEntities = ordersRepository.findAllByFilter(filterRequest,pageable);
        if (ordersEntities != null && !ordersEntities.isEmpty()) {
            List<OrdersDTO> ordersDTOList = ordersEntities.getContent().stream().map(ordersEntity -> {
                OrdersDTO ordersDTO = modelMapper.map(ordersEntity, OrdersDTO.class);
                    ordersDTO.setName(ordersEntity.getUser().getName());
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



}
