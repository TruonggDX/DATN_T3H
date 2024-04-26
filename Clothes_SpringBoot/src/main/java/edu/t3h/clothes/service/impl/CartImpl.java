package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.CartDTO;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.CartResponse;
import edu.t3h.clothes.repository.*;
import edu.t3h.clothes.service.ICartService;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.*;
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
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ColorRepository colorRepository;

    @Override
    public BaseResponse<?> deleteCartById(Long id) {
        BaseResponse<List<CartDTO>> baseResponse;
        Optional<CartEntity> cartEntityOptional = cartRepository.findById(id);
        if (cartEntityOptional.isEmpty()) {
            baseResponse = new BaseResponse<>(HttpStatus.NOT_FOUND.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return baseResponse;
        }
        CartEntity cartEntity = cartEntityOptional.get();
        cartEntity.setDeleted(true);
        cartRepository.save(cartEntity);

        baseResponse = new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, null);
        return baseResponse;
    }


    @Override
    public BaseResponse<Long> countCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String currentUsername = authentication.getName();
            UserEntity currentUser = userEntityRepository.findByUsername(currentUsername);
            if (currentUser != null) {
                Long cartCount = cartRepository.countProductOfUser(currentUser.getId());
                BaseResponse<Long> response = new BaseResponse<>();
                response.setData(cartCount);
                response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
                response.setCode(HttpStatus.OK.value());
                return response;
            } else {
                BaseResponse<Long> response = new BaseResponse<>();
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                response.setCode(HttpStatus.NOT_FOUND.value());
                return response;
            }
        } else {
            BaseResponse<Long> response = new BaseResponse<>();
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setCode(HttpStatus.UNAUTHORIZED.value());
            return response;
        }
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


            double totalPriceOfCart = cartRepository.getTotalPriceOfAllCartItems();

            cartEntity.setTotal_cart(totalPriceOfCart);
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

    public BaseResponse<?> addToCart(CartDTO cartDTO) {
        BaseResponse<?> response = new BaseResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentUsername = authentication.getName();
            UserEntity currentUser = userEntityRepository.findByUsername(currentUsername);
            if (currentUser != null) {
                Optional<ProductEntity> productOptional = productRepository.findById(cartDTO.getProductId());
                if (productOptional.isEmpty()) {
                    response.setCode(HttpStatus.BAD_REQUEST.value());
                    response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                    return response;
                }
                Set<SizeEntity> sizeEntities = sizeRepository.findByIds(cartDTO.getSizeId());
                if (CollectionUtils.isEmpty(sizeEntities)) {
                    response.setCode(HttpStatus.BAD_REQUEST.value());
                    response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                    return response;
                }
                Set<ColorEntity> colorEntities = colorRepository.findByIdIsInAndDeletedIsFalse(cartDTO.getColorId());
                if (CollectionUtils.isEmpty(colorEntities)) {
                    response.setCode(HttpStatus.BAD_REQUEST.value());
                    response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                    return response;
                }
                CartEntity cartEntity = new CartEntity();
                cartEntity.setId(cartDTO.getId());

                LocalDateTime now = LocalDateTime.now();
                cartEntity.setCreatedDate(now);

                ProductEntity productEntity = productOptional.get();
                productEntity.setId(cartDTO.getProductId());
                productEntity.setColorEntities(colorEntities);
                productEntity.setSizeEntities(sizeEntities);
                Double price =productEntity.getPrice();
                cartEntity.setProduct(productEntity);
                cartEntity.setPrice(price);

                cartEntity.setNumber(1L);


                cartEntity.setModifiedBy(currentUsername);

                cartEntity.setDeleted(false);
                cartEntity.setUser(currentUser);
                cartRepository.save(cartEntity);

                response.setCode(HttpStatus.OK.value());
                response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
                return response;

            }
            response.setCode(HttpStatus.UNAUTHORIZED.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;

        }
        response.setCode(HttpStatus.UNAUTHORIZED.value());
        response.setMessage(Constant.HTTP_MESSAGE.FAILED);
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

    @Override
    public BaseResponse<Page<CartResponse>> getCartItems(int page, int size) {
        BaseResponse<Page<CartResponse>> response = new BaseResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        UserEntity currentUser = userEntityRepository.findByUsername(currentUsername);
        Pageable pageable = PageRequest.of(page, size);
        Page<CartEntity> cartEntities = cartRepository.getProductOfUserInCart(currentUser.getId(), pageable);
        List<CartResponse> cartDTOS = cartEntities.getContent().stream().map(cartEntity -> {
            CartResponse cartResponse = new CartResponse();
            cartResponse.setId(cartEntity.getId());
            cartResponse.setUserId(cartEntity.getUser().getId());
            cartResponse.setProductId(cartEntity.getProduct().getId());
            cartResponse.setName(cartEntity.getProduct().getName());
            cartResponse.setCode(cartEntity.getProduct().getCode());
            cartResponse.setNumber(cartEntity.getNumber());
            cartResponse.setPrice(cartEntity.getProduct().getPrice());
            cartResponse.setMaterial(cartEntity.getProduct().getMaterial());
            cartResponse.setCategoryId(cartEntity.getProduct().getCategoryEntity().getId());
            cartResponse.setProducerId(cartEntity.getProduct().getProducerEntity().getId());
            cartResponse.setSizeId(cartEntity.getProduct().getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList()));
            cartResponse.setNameSize(cartEntity.getProduct().getSizeEntities().stream().map(SizeEntity::getName).collect(Collectors.joining(",")));
            cartResponse.setColorId(cartEntity.getProduct().getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList()));
            cartResponse.setNameColor(cartEntity.getProduct().getColorEntities().stream().map(ColorEntity::getImage).collect(Collectors.joining(",")));
            Long quantity = cartEntity.getNumber();
            cartResponse.setTotal(cartEntity.getProduct().getPrice() * quantity);
            return cartResponse;
        }).collect(Collectors.toList());
        double totalPriceOfCart = cartDTOS.stream().mapToDouble(CartResponse::getTotal).sum();
        cartDTOS.forEach(cartResponse -> cartResponse.setTotal_cart(totalPriceOfCart));
        Page<CartResponse> pageData = new PageImpl<>(cartDTOS, pageable, cartEntities.getTotalElements());
        response.setData(pageData);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
