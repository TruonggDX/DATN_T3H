package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.model.dto.CartDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.CartResponse;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;

public interface ICartService {

    BaseResponse<?> deleteCartById(Long id);

    BaseResponse<Long> countCart();

    BaseResponse<CartDTO> updateQuantityProduct(Long id,CartDTO cartDTO);


    BaseResponse<?> addToCart(CartDTO cartDTO);

    CartDTO findCartById(Long id);


    BaseResponse<Page<CartResponse>> getCartItems(int page, int size);
}
