package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.OrdersEntity;
import edu.t3h.clothes.model.dto.OrderDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

  @Mapping(target = "accountId", source = "account.id")
  @Mapping(target = "accountName", source = "account.fullname")
  OrderDto toDto(OrdersEntity ordersEntity);

  OrdersEntity toEntity(OrderDto orderDto);

}
