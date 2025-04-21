package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.PaymentEntity;
import edu.t3h.clothes.model.dto.PaymentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

  @Mapping(target = "orderId", source = "ordersEntity.id")
  PaymentDto toDto(PaymentEntity paymentEntity);

  PaymentEntity toEntity(PaymentDto paymentDto);
}
