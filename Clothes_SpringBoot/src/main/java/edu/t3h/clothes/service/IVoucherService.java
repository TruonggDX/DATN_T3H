package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IVoucherService {

  ResponsePage<List<VoucherDto>> getVouchers(Pageable pageable);

  BaseResponse<VoucherDto> createVoucher(VoucherDto voucherDto);

  BaseResponse<VoucherDto> updateVoucher(Long id, VoucherDto voucherDto);

  BaseResponse<VoucherDto> getVoucherById(Long id);

  BaseResponse<VoucherDto> deleteVoucher(Long id);

  ResponsePage<List<VoucherDto>> searchVoucherByCondition(String code, String name, Boolean status,
      Pageable pageable);

}