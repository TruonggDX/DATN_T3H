package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IVoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vouchers")
@RequiredArgsConstructor
public class ApiVoucher {

  private final IVoucherService voucherService;


  @PostMapping
  public BaseResponse<VoucherDto> createVoucher(@RequestBody VoucherDto voucherDto) {
    return voucherService.createVoucher(voucherDto);
  }

  @GetMapping("/{id}")
  public BaseResponse<VoucherDto> getVoucherById(@PathVariable Long id) {
    return voucherService.getVoucherById(id);
  }

  @GetMapping
  public ResponsePage<VoucherDto> getVouchers(Pageable pageable) {
    return voucherService.getVouchers(pageable);
  }


  @PutMapping("/{id}")
  public BaseResponse<VoucherDto> updateVoucher(@PathVariable Long id, @RequestBody VoucherDto voucherDto) {
    return voucherService.updateVoucher(id, voucherDto);
  }


  @DeleteMapping("/{id}")
  public BaseResponse<VoucherDto> deleteVoucher(@PathVariable Long id) {
    return voucherService.deleteVoucher(id);
  }


  @GetMapping("/search/code")
  public ResponsePage<VoucherDto> searchVoucherByCode(@RequestParam String code, Pageable pageable) {
    return voucherService.searchVoucherByCode(code, pageable);
  }

  @GetMapping("/search/status")
  public ResponsePage<VoucherDto> searchVoucherByStatus(@RequestParam boolean status, Pageable pageable) {
    return voucherService.searchVoucherByStatus(status, pageable);
  }

  @GetMapping("/search/name")
  public ResponsePage<VoucherDto> searchVoucherByName(@RequestParam String name, Pageable pageable) {
    return voucherService.searchVoucherByName(name, pageable);
  }
}