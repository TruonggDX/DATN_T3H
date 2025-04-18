package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.model.dto.CartDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.CartResponse;
import edu.t3h.clothes.service.ICartService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartResource {
    @Autowired
    private ICartService iCartService;

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable Long id){
        BaseResponse<?> response = iCartService.deleteCartById(id);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }


    @GetMapping("/count")
    public ResponseEntity<BaseResponse<Long>> countCartItems() {
        BaseResponse<Long> response = iCartService.countCart();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?>updateQuantity(@PathVariable Long id, @RequestBody CartDTO cartDTO) {
        BaseResponse<?> response = iCartService.updateQuantityProduct(id, cartDTO);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }
    @GetMapping("/search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        CartDTO cartDTO = iCartService.findCartById(id);
        if (cartDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,cartDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
    }


    @PostMapping("/addPInCart")
    public ResponseEntity<?> createProduct(@RequestBody CartDTO cartDTO) {
        BaseResponse<?> reponse = iCartService.addToCart(cartDTO);
        if (reponse != null && reponse.getCode() == HttpStatus.OK.value()) {
            // In ra thông tin của sản phẩm đã được tạo thành công
            System.out.println("Product created successfully:");
            System.out.println(reponse.toString());
            // Trả về phản hồi cho client
            return ResponseEntity.ok().body(reponse);
        } else {
            // Nếu sản phẩm không được tạo thành công hoặc có lỗi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(reponse != null ? reponse.getMessage() : "Failed to create product");
        }
    }


    @GetMapping("/listpOfUs")
    public ResponseEntity<BaseResponse<Page<CartResponse>>> getCartItems(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
        BaseResponse<Page<CartResponse>> response = iCartService.getCartItems(page, size);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getCode()));
    }


}
