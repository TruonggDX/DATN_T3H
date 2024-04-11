package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.CartDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.CartRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.ICartService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartImpl implements ICartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private ModelMapper modelMapper;
//    @Override
//    public BaseResponse<Page<CartDTO>> getAll(CartFilterRequest filterRequest, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<CartEntity> cartEntities = cartRepository.findAllByFilter(filterRequest,pageable);
//
//        if (cartEntities != null && !cartEntities.isEmpty()) {
//            List<CartDTO> cartDTOS = cartEntities.getContent().stream().map(cartEntity -> {
//                CartDTO cartDTO = modelMapper.map(cartEntity, CartDTO.class);
//                cartDTO.setNameUser(cartEntity.getUser().getName());
//                cartDTO.setNameProduct(cartEntity.getProduct().getName());
//                double total = cartEntity.getNumber() * cartEntity.getPrice();
//                cartDTO.setTotal(total);
////                List<Long> productId = Collections.singletonList(cartEntity.getProduct().getId());
////                cartDTO.setProductId(productId);
//                Long productId = cartEntity.getProduct().getId();
//                cartDTO.setProductId(productId);
//
//                Long userId = cartEntity.getUser().getId();
//                cartDTO.setId(userId);
//
//                return cartDTO;
//            }).collect(Collectors.toList());
//
//            Page<CartDTO> pageData = new PageImpl<>(cartDTOS, pageable, cartEntities.getTotalElements());
//            BaseResponse<Page<CartDTO>> response = new BaseResponse<>();
//            response.setCode(HttpStatus.OK.value());
//            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
//            response.setData(pageData);
//            return response;
//        } else {
//            BaseResponse<Page<CartDTO>> response = new BaseResponse<>();
//            response.setCode(HttpStatus.NOT_FOUND.value());
//            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
//            response.setData(new PageImpl<>(Collections.emptyList()));
//            return response;
//        }
//    }

    @Override
    public BaseResponse<Page<CartDTO>> getAll(CartFilterRequest filterRequest, int page, int size, Long userId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CartEntity> cartEntities = cartRepository.findAllByFilter(filterRequest, userId, pageable);

        if (cartEntities != null && !cartEntities.isEmpty()) {
            List<CartDTO> cartDTOS = cartEntities.getContent().stream().map(cartEntity -> {
                CartDTO cartDTO = modelMapper.map(cartEntity, CartDTO.class);
                cartDTO.setNameUser(cartEntity.getUser().getName());
                cartDTO.setNameProduct(cartEntity.getProduct().getName());
                double total = cartEntity.getNumber() * cartEntity.getPrice();
                cartDTO.setTotal(total);
                Long productId = cartEntity.getProduct().getId();
                cartDTO.setProductId(productId);
                cartDTO.setUserId(userId); // Đặt userId vào CartDTO

                return cartDTO;
            }).collect(Collectors.toList());

            Page<CartDTO> pageData = new PageImpl<>(cartDTOS, pageable, cartEntities.getTotalElements());
            BaseResponse<Page<CartDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(pageData);
            return response;
        } else {
            BaseResponse<Page<CartDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData(new PageImpl<>(Collections.emptyList()));
            return response;
        }
    }


    @Override
    public BaseResponse<?> deleteById(Long Id) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<CartEntity> optionalCartEntity = cartRepository.findById(Id);
        if (optionalCartEntity.isPresent()) {
            CartEntity cartEntity = optionalCartEntity.get();

            cartEntity.setDeleted(true);
            cartRepository.save(cartEntity);

            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        return response;
    }

    @Override
    public BaseResponse<Long> countCart(Long uId) {
        Long cartCount = cartRepository.countProductOfUser(uId);
        BaseResponse<Long> response = new BaseResponse<>();
        response.setData(cartCount);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<CartDTO> updateQuantityProduct(Long id, CartDTO cartDTO) {
        BaseResponse<CartDTO> response = new BaseResponse<>();
        Optional<CartEntity> optionalCartEntity = cartRepository.findById(id);
        if (optionalCartEntity.isPresent()) {
            CartEntity cartEntity = optionalCartEntity.get();
            double productPrice = cartEntity.getProduct().getPrice();
            cartEntity.setNumber(cartDTO.getNumber());
            double totalPrice = productPrice * cartDTO.getNumber();
            cartEntity.setTotal(totalPrice);
            cartRepository.save(cartEntity);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(cartDTO);
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        return response;
    }


    @Override
    public BaseResponse<CartDTO> addToCart(CartDTO cartDTO) {
        BaseResponse<CartDTO> response = new BaseResponse<>();
        try {
            ProductEntity productEntity = productRepository.findById(cartDTO.getProductId()).orElse(null);
            if (productEntity == null) {
                response.setCode(HttpStatus.NOT_FOUND.value());
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                return response;
            }

            UserEntity userEntity = userEntityRepository.findById(cartDTO.getUserId()).orElse(null);
            if (userEntity == null) {
                response.setCode(HttpStatus.NOT_FOUND.value());
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                return response;
            }


            CartEntity cartEntity = new CartEntity();
            cartEntity.setProduct(productEntity);
            cartEntity.setNumber(cartDTO.getNumber());
            cartEntity.setPrice(productEntity.getPrice());
            cartEntity.setDeleted(false);
            cartEntity.setUser(userEntity);
            cartEntity.setTotal(cartDTO.getTotal());
            double totalPrice = productEntity.getPrice() * cartDTO.getNumber();
            cartEntity.setTotal(totalPrice);
            CartEntity savedCartEntity = cartRepository.save(cartEntity);


            CartDTO savedCartDTO = new CartDTO();
            savedCartDTO.setId(savedCartEntity.getId());
            savedCartDTO.setProductId(savedCartEntity.getProduct().getId());
            savedCartDTO.setNameProduct(savedCartEntity.getProduct().getName());

            savedCartDTO.setUserId(savedCartEntity.getUser().getId());
            savedCartDTO.setNameUser(savedCartEntity.getUser().getName());

            savedCartDTO.setNumber(savedCartEntity.getNumber());

            response.setData(savedCartDTO);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } catch (Exception e) {
            response.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public CartDTO findCartById(Long id) {
        Optional<CartEntity> cartEntityOptional = cartRepository.findById(id);
        CartEntity cartEntity = null;
        BaseResponse<CartDTO> response;

        if (cartEntityOptional.isEmpty()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, CartDTO.class);
        }

        cartEntity = cartEntityOptional.get();
        if (cartEntity.getDeleted()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, CartDTO.class);
        }

        CartDTO cartDTO = modelMapper.map(cartEntity, CartDTO.class);
        return cartDTO;
    }


}
