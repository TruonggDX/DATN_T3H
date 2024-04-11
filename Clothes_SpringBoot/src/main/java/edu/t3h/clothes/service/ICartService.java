package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.model.dto.CartDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;

public interface ICartService {
    BaseResponse<Page<CartDTO>> getAll(CartFilterRequest filterRequest, int page, int size, Long userId);

    BaseResponse<?> deleteById(Long Id);

    BaseResponse<Long> countCart(Long uId);

    BaseResponse<CartDTO> updateQuantityProduct(Long id,CartDTO cartDTO);

    BaseResponse<CartDTO> addToCart(CartDTO cartDTO);

    CartDTO findCartById(Long id);
}
