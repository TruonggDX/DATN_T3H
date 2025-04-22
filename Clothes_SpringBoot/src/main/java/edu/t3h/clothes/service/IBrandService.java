package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IBrandService {

  ResponsePage<List<BrandDto>> getBrands(Pageable pageable);

  BaseResponse<BrandDto> createBrand(BrandDto brandDto, MultipartFile file);

  BaseResponse<BrandDto> getBrandById(Long id);

  BaseResponse<BrandDto> updateBrand(Long id, BrandDto brandDto, MultipartFile file);

  BaseResponse<BrandDto> deleteBrand(Long id);

  ResponsePage<List<BrandDto>> findByName(String name,Pageable pageable);
}