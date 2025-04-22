package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.VariantDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IVariantService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
