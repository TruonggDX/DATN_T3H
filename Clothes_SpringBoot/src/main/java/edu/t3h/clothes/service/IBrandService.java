package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.BrandDto;
import java.util.List;

public interface IBrandService {
  BrandDto createBrand(BrandDto brandDto);
  BrandDto getBrandById(Long id);
  List<BrandDto> getAllBrands();
  BrandDto updateBrand(Long id, BrandDto brandDto);
  void deleteBrand(Long id);
}
