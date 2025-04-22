package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IBrandService {
  BrandDto createBrand(BrandDto brandDto);
  BrandDto getBrandById(Long id);
  ResponsePage<List<BrandDto>> getBrands(Pageable pageable);
  BrandDto updateBrand(Long id, BrandDto brandDto);
  void deleteBrand(Long id);
}