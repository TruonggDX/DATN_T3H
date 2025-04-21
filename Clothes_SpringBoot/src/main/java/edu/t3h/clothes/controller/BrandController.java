package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.service.IBrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

  private final IBrandService brandService;

  @PostMapping
  public ResponseEntity<BrandDto> createBrand(@RequestBody BrandDto brandDto) {
    BrandDto created = brandService.createBrand(brandDto);
    return ResponseEntity.ok(created);
  }

  @GetMapping("/{id}")
  public ResponseEntity<BrandDto> getBrandById(@PathVariable Long id) {
    BrandDto dto = brandService.getBrandById(id);
    return ResponseEntity.ok(dto);
  }

  @GetMapping
  public ResponseEntity<List<BrandDto>> getAllBrands() {
    List<BrandDto> list = brandService.getAllBrands();
    return ResponseEntity.ok(list);
  }

  @PutMapping("/{id}")
  public ResponseEntity<BrandDto> updateBrand(@PathVariable Long id,
      @RequestBody BrandDto brandDto) {
    BrandDto updated = brandService.updateBrand(id, brandDto);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
    brandService.deleteBrand(id);
    return ResponseEntity.noContent().build();
  }
}