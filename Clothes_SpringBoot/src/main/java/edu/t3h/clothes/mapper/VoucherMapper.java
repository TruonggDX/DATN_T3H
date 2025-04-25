package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.model.dto.VoucherDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VoucherMapper {
  @Mapping(source = "products", target = "productIds")
  VoucherDto toDto(VoucherEntity entity);

  VoucherEntity toEntity(VoucherDto dto);
}
