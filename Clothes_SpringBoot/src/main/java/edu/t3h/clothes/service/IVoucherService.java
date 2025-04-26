package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IVoucherService {

  BaseResponse<VoucherDto> createVoucher(VoucherDto voucherDto);

  BaseResponse<VoucherDto> getVoucherById(Long id);

  ResponsePage<VoucherDto> getVouchers(Pageable pageable);

  BaseResponse<VoucherDto> updateVoucher(Long id, VoucherDto voucherDto);

  BaseResponse<VoucherDto> deleteVoucher(Long id);

  ResponsePage<VoucherDto> searchVoucherByCode(String code, Pageable pageable);
}