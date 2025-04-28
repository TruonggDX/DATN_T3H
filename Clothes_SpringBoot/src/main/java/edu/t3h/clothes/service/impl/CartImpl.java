package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.mapper.CartMapper;
import edu.t3h.clothes.model.dto.CartDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.CartRepository;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.ICartService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartImpl implements ICartService {

  private final CartRepository cartRepository;
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
}
