package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IBrandService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class ApiBrand {

  private final IBrandService brandService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<BrandDto>>> getAllBrands(Pageable pageable) {
    ResponsePage<List<BrandDto>> respPage = brandService.getBrands(pageable);
    return ResponseEntity.ok(respPage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<BrandDto>> createBrand(@ModelAttribute BrandDto brandDto,
      @RequestParam(value = "file", required = false) MultipartFile file) {
    BaseResponse<BrandDto> response = brandService.createBrand(brandDto, file);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<BrandDto>> getBrandById(@PathVariable Long id) {
    BaseResponse<BrandDto> dto = brandService.getBrandById(id);
    return ResponseEntity.ok(dto);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<BrandDto>> updateBrand(@PathVariable Long id,
      @ModelAttribute BrandDto brandDto,
      @RequestParam(value = "file", required = false) MultipartFile file) {
    BaseResponse<BrandDto> updated = brandService.updateBrand(id, brandDto, file);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<BrandDto>> deleteBrand(@PathVariable Long id) {
    BaseResponse<BrandDto> response = brandService.deleteBrand(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findByName/{name}")
  public ResponseEntity<ResponsePage<List<BrandDto>>> getBrandByName(@PathVariable String name,
      Pageable pageable) {
    ResponsePage<List<BrandDto>> responsePage = brandService.findByName(name, pageable);
    return ResponseEntity.ok(responsePage);
  }
}
