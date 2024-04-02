package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.OrderFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/order")
public class OrderResouce {
    @Autowired
    private OrderService orderService;

//    @GetMapping("/list")
//    public ResponseEntity<BaseResponse<List<OrdersDTO>>> getAllOrders(OrderFilterRequest filterRequest) {
//        BaseResponse<List<OrdersDTO>> response = orderService.getAll(filterRequest);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
@GetMapping("/list")
public ResponseEntity<BaseResponse<Page<OrdersDTO>>> getAll(
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "10") int size) {


    OrderFilterRequest filterRequest = new OrderFilterRequest();
    return ResponseEntity.ok(orderService.getAll(filterRequest, page, size));
}
}
