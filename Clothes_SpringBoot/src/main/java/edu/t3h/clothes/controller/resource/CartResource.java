package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.model.dto.CartDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
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

    @GetMapping("/list/{userId}")
    public ResponseEntity<BaseResponse<Page<CartDTO>>> getAllByUserId(
            @PathVariable("userId") Long userId,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
            CartFilterRequest filterRequest = new CartFilterRequest();
        return ResponseEntity.ok(iCartService.getAll(filterRequest, page, size,userId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable Long id){
        BaseResponse<?> response = iCartService.deleteById(id);
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response.getMessage());
        }
    }


    @GetMapping("/count/{userId}")
    public ResponseEntity<BaseResponse<Long>> countCartItems(@PathVariable Long userId) {
        BaseResponse<Long> response = iCartService.countCart(userId);
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

    @PostMapping("/add")
    public ResponseEntity<BaseResponse<CartDTO>> addToCart(@RequestBody CartDTO cartDTO) {
        BaseResponse<CartDTO> response = iCartService.addToCart(cartDTO);
        return ResponseEntity.status(response.getCode()).body(response);
    }
}
