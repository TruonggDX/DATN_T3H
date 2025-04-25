package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.VariantDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IVariantService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/variant")
public class ApiVariant {

  private final IVariantService iVariantService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<VariantDto>>> getAllVariants(Pageable pageable) {
    ResponsePage<List<VariantDto>> responsePage = iVariantService.getAllVariants(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<VariantDto>> createRole(@RequestBody VariantDto variantDto) {
    BaseResponse<VariantDto> response = iVariantService.createVariant(variantDto);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<VariantDto>> createRole(@PathVariable Long id,
      @RequestBody VariantDto variantDto) {
    BaseResponse<VariantDto> response = iVariantService.updateVariant(id, variantDto);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<VariantDto>> deleteVariant(@PathVariable Long id) {
    BaseResponse<VariantDto> response = iVariantService.deleteVariant(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<VariantDto>> getById(@PathVariable Long id) {
    BaseResponse<VariantDto> response = iVariantService.getVariantById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findByCondition")
  public ResponseEntity<ResponsePage<List<VariantDto>>> getAllVariantsByCodeAndName(
      @RequestParam(value = "code") String code,
      @RequestParam(value = "productName") String productName, Pageable pageable) {
    ResponsePage<List<VariantDto>> responsePage = iVariantService.getAllVariantsByCodeAndProductName(
        code, productName, pageable);
    return ResponseEntity.ok(responsePage);
  }
}
