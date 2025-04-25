package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.VariantDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IVariantService {

  ResponsePage<List<VariantDto>> getAllVariants(Pageable pageable);

  BaseResponse<VariantDto> createVariant(VariantDto variantDto);

  BaseResponse<VariantDto> updateVariant(Long id, VariantDto variantDto);

  BaseResponse<VariantDto> deleteVariant(Long id);

  BaseResponse<VariantDto> getVariantById(Long id);

  ResponsePage<List<VariantDto>> getAllVariantsByCodeAndProductName(String code, String productName,
      Pageable pageable);
}
