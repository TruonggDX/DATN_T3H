package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.OrderDetailsEntity;
import edu.t3h.clothes.model.dto.OrderDetailDto;
import edu.t3h.clothes.model.response.OrderDetailResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

  @Mapping(target = "orderId", source = "order.id")
  @Mapping(target = "productId", source = "product.id")
  @Mapping(target = "productName", source = "product.name")
  @Mapping(target = "variantId", source = "variant.id")
  OrderDetailDto toDto(OrderDetailsEntity orderDetailsEntity);

  @Mapping(target = "orderId", source = "order.id")
  @Mapping(target = "productId", source = "product.id")
  @Mapping(target = "productName", source = "product.name")
  OrderDetailResponse toResponse(OrderDetailsEntity orderDetailsEntity);

  OrderDetailsEntity toEntity(OrderDetailDto orderDetailDto);
}
