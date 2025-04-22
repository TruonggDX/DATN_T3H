package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IBrandService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

  private static final String SUCCESS_MESSAGE = "Success";
  private final IBrandService brandService;

  @PostMapping
  public ResponseEntity<BaseResponse<BrandDto>> createBrand(@RequestBody BrandDto brandDto) {
    BrandDto created = brandService.createBrand(brandDto);
    return ResponseEntity.ok(new BaseResponse<>(0, SUCCESS_MESSAGE, created));
  }

  @GetMapping("/{id}")
  public ResponseEntity<BaseResponse<BrandDto>> getBrandById(@PathVariable Long id) {
    BrandDto dto = brandService.getBrandById(id);
    return ResponseEntity.ok(new BaseResponse<>(0, SUCCESS_MESSAGE, dto));
  }

  @GetMapping
  public ResponseEntity<BaseResponse<ResponsePage<List<BrandDto>>>> getAllBrands(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size);
    ResponsePage<List<BrandDto>> respPage = brandService.getBrands(pageable);
    return ResponseEntity.ok(new BaseResponse<>(0, SUCCESS_MESSAGE, respPage));
  }

  @PutMapping("/{id}")
  public ResponseEntity<BaseResponse<BrandDto>> updateBrand(
      @PathVariable Long id,
      @RequestBody BrandDto brandDto) {
    BrandDto updated = brandService.updateBrand(id, brandDto);
    return ResponseEntity.ok(new BaseResponse<>(0, SUCCESS_MESSAGE, updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<BaseResponse<Void>> deleteBrand(@PathVariable Long id) {
    brandService.deleteBrand(id);
    return ResponseEntity.ok(new BaseResponse<>(0, SUCCESS_MESSAGE, null));
  }
}
