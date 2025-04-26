package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IVoucherService;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

//@RestponEntity
@RestController
@RequestMapping("/api/vouchers")
public class VoucherController {

  private final IVoucherService voucherService;

  public VoucherController(IVoucherService voucherService) {
    this.voucherService = voucherService;
  }

  // Endpoint tạo voucher mới
  @PostMapping
  public BaseResponse<VoucherDto> createVoucher(@RequestBody VoucherDto voucherDto) {
    return voucherService.createVoucher(voucherDto);
  }

  // Endpoint lấy voucher theo ID
  @GetMapping("/{id}")
  public BaseResponse<VoucherDto> getVoucherById(@PathVariable Long id) {
    return voucherService.getVoucherById(id);
  }

  // Endpoint lấy danh sách tất cả voucher
  @GetMapping
  public ResponsePage<VoucherDto> getVouchers(Pageable pageable) {
    return voucherService.getVouchers(pageable);
  }

  // Endpoint cập nhật voucher
  @PutMapping("/{id}")
  public BaseResponse<VoucherDto> updateVoucher(@PathVariable Long id, @RequestBody VoucherDto voucherDto) {
    return voucherService.updateVoucher(id, voucherDto);
  }

  // Endpoint xóa voucher (chỉ đánh dấu xóa)
  @DeleteMapping("/{id}")
  public BaseResponse<VoucherDto> deleteVoucher(@PathVariable Long id) {
    return voucherService.deleteVoucher(id);
  }

  // Endpoint tìm kiếm voucher theo mã
  @GetMapping("/search")
  public ResponsePage<VoucherDto> searchVoucherByCode(@RequestParam String code, Pageable pageable) {
    return voucherService.searchVoucherByCode(code, pageable);
  }
}
