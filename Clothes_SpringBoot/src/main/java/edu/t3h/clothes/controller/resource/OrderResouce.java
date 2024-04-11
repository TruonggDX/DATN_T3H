package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.OrderFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.OrderService;
import edu.t3h.clothes.utils.Constant;
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

    @GetMapping("/list")
    public ResponseEntity<BaseResponse<Page<OrdersDTO>>> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {


        OrderFilterRequest filterRequest = new OrderFilterRequest();
        return ResponseEntity.ok(orderService.getAll(filterRequest, page, size));
    }
    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteOrders(@PathVariable Long id) {
        BaseResponse<?> response = orderService.deleteOrder(id);
        return response;
    }

    @GetMapping("/search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        OrdersDTO ordersDTO = orderService.findOrderById(id);
        if (ordersDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,ordersDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
    }
    @PostMapping("/create")
    public ResponseEntity<?> createOrders(@RequestBody OrdersDTO orderDTO) {
        BaseResponse<?> createdOrder = orderService.creatOrder(orderDTO);
        if (createdOrder != null && createdOrder.getCode() == HttpStatus.OK.value()) {
            // In ra thông tin của sản phẩm đã được tạo thành công
            System.out.println("Order created successfully:");
            System.out.println(createdOrder.toString());
            return ResponseEntity.ok().body(createdOrder);
        } else {
            // Nếu sản phẩm không được tạo thành công hoặc có lỗi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createdOrder != null ? createdOrder.getMessage() : "Failed to create product");
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?>updateOrder(@PathVariable Long id, @RequestBody OrdersDTO orderDto) {
        BaseResponse<?> response = orderService.updateOrder(id, orderDto);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }

    @GetMapping("/searchByCondition/{condition}")
    public BaseResponse<?> searchOrdersByCondition(@PathVariable String condition) {
        BaseResponse<List<OrdersDTO>> orderDTO = orderService.searchOrderCondition(condition);
        if (orderDTO.getData() != null && !orderDTO.getData().isEmpty()) {
            BaseResponse<List<OrdersDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(orderDTO.getData());
            return response;
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }


}
