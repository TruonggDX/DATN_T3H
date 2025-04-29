package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.mapper.CartMapper;
import edu.t3h.clothes.model.dto.CartDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.request.CartRequest;
import edu.t3h.clothes.model.request.UpdateCartRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.CartRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.ICartService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartImpl implements ICartService {

  private final CartRepository cartRepository;
  private final ProductRepository productRepository;
  private final AccountRepository accountRepository;
  private final CartMapper cartMapper;
  private final JwtService jwtService;

  @Override
  public ResponsePage<List<CartDto>> getAllCarts(Pageable pageable) {
    ResponsePage<List<CartDto>> responsePage = new ResponsePage<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Page<CartEntity> page = cartRepository.getCartByEmail(email, pageable);
    List<CartDto> cartDtos = page.getContent().stream().map(cartMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(cartDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<CartDto> addCart(CartRequest cartRequest) {
    BaseResponse<CartDto> response = new BaseResponse<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<ProductEntity> checkProduct = productRepository.findById(cartRequest.getProductId());
    if (checkProduct.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Product not found with id: " + cartRequest.getProductId());
      return response;
    }
    Optional<AccountEntity> checkAccount = accountRepository.findByEmail(email);
    if (checkAccount.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.ACCOUNT_NOT_FOUND + email);
      return response;
    }
    CartEntity cartEntity = cartMapper.toEntity(cartRequest);
    cartEntity.setAccount(checkAccount.get());
    cartEntity.setDeleted(false);
    cartEntity.setNumber(cartRequest.getNumber());
    cartEntity.setProduct(checkProduct.get());
    cartRepository.save(cartEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(cartMapper.toDto(cartEntity));
    return response;
  }

  @Override
  public BaseResponse<CartDto> updateCart(Long id, UpdateCartRequest updateCartRequest) {
    BaseResponse<CartDto> response = new BaseResponse<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<CartEntity> checkCart = cartRepository.findById(id);
    if (checkCart.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Cart not found with id: " + id);
      return response;
    }
    Optional<AccountEntity> checkAccount = accountRepository.findByEmail(email);
    if (checkAccount.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.ACCOUNT_NOT_FOUND + email);
      return response;
    }
    CartEntity cartEntity = checkCart.get();
    cartEntity.setNumber(updateCartRequest.getNumber());
    cartEntity.setDeleted(false);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(cartMapper.toDto(cartEntity));
    return response;
  }

  @Override
  public BaseResponse<CartDto> deleteCart(Long id) {
    BaseResponse<CartDto> response = new BaseResponse<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<CartEntity> checkCart = cartRepository.findById(id);
    if (checkCart.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Cart not found with id: " + id);
      return response;
    }
    Optional<AccountEntity> checkAccount = accountRepository.findByEmail(email);
    if (checkAccount.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.ACCOUNT_NOT_FOUND + email);
      return response;
    }
    CartEntity cartEntity = checkCart.get();
    cartRepository.delete(cartEntity);
    CartDto cartDto = cartMapper.toDto(cartEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(cartDto);
    return response;
  }
}
