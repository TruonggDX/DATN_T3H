package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.model.dto.VoucherDto;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VoucherMapper {
  public VoucherDto toDto(VoucherEntity voucherEntity){
    VoucherDto dto = new VoucherDto();
    dto.setId(voucherEntity.getId());
    dto.setCode(voucherEntity.getCode());
    dto.setName(voucherEntity.getName());
    dto.setDescription(voucherEntity.getDescription());
    dto.setDescription_type(voucherEntity.getDescription_type());
    dto.setDiscount_value(voucherEntity.getDiscount_value());
    dto.setMin_order_amount(voucherEntity.getMin_order_amount());
    dto.setQuantity(voucherEntity.getQuantity());
    dto.setUsed(voucherEntity.getUsed());
    dto.setIs_active(voucherEntity.getIs_active());
    dto.setStart_date(voucherEntity.getStart_date());
    dto.setEnd_date(voucherEntity.getEnd_date());

    // Lấy ra danh sách ID sản phẩm
    Set<Long> productIds = voucherEntity.getProducts()
        .stream()
        .map(ProductEntity::getId)
        .collect(Collectors.toSet());
    dto.setProductIds(productIds);

    return dto;
  }
}
