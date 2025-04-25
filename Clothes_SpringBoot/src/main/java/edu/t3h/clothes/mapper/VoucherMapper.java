package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.model.dto.VoucherDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VoucherMapper {

  VoucherDto toDto(VoucherEntity entity);

  VoucherEntity toEntity(VoucherDto dto);
}
