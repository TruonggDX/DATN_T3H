package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.OrderDetailsEntity;
import edu.t3h.clothes.model.dto.OrderDetailDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

  @Mapping(target = "orderId", source = "order.id")
  @Mapping(target = "productId", source = "product.id")
  OrderDetailDto toDto(OrderDetailsEntity orderDetailsEntity);

  OrderDetailsEntity toEntity(OrderDetailDto orderDetailDto);
}
