package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IVoucherService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vouchers")
@RequiredArgsConstructor
public class ApiVoucher {

  private final IVoucherService voucherService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<VoucherDto>>> getVouchers(Pageable pageable) {
    ResponsePage<List<VoucherDto>> responsePage = voucherService.getVouchers(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<VoucherDto>> createVoucher(
      @RequestBody VoucherDto voucherDto) {
    BaseResponse<VoucherDto> response = voucherService.createVoucher(voucherDto);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<VoucherDto>> updateVoucher(@PathVariable Long id,
      @RequestBody VoucherDto voucherDto) {
    BaseResponse<VoucherDto> baseResponse = voucherService.updateVoucher(id, voucherDto);
    return ResponseEntity.ok(baseResponse);
  }

  @GetMapping("/findById/{id}")
  public BaseResponse<VoucherDto> getVoucherById(@PathVariable Long id) {
    return voucherService.getVoucherById(id);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<VoucherDto>> deleteVoucher(@PathVariable Long id) {
    BaseResponse<VoucherDto> response = voucherService.deleteVoucher(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/search-condition")
  public ResponseEntity<ResponsePage<List<VoucherDto>>> searchVoucherByCode(
      @RequestParam(value = "code") String code, @RequestParam(value = "name") String name,
      @RequestParam(value = "status", required = false) Boolean status, Pageable pageable) {
    ResponsePage<List<VoucherDto>> responsePage = voucherService.searchVoucherByCondition(code,
        name, status, pageable);
    return ResponseEntity.ok(responsePage);
  }
}