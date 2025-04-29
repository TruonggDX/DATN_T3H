package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.model.dto.CartDto;
import edu.t3h.clothes.model.request.CartRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface CartMapper {

  @Mapping(target = "accountId", source = "account.id")
  @Mapping(target = "productId", source = "product.id")
  CartDto toDto(CartEntity cartEntity);

  CartEntity toEntity(CartDto cartDto);

  CartEntity toEntity(CartRequest cartRequest);
}
