package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.OrderFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    BaseResponse<Page<OrdersDTO>> getAll(OrderFilterRequest filterRequest, int page, int size);
}
