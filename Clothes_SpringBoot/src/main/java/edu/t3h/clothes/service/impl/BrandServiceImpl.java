package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.mapper.BrandMapper;
import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.repository.BrandRepository;
import edu.t3h.clothes.service.IBrandService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements IBrandService {

  private final BrandRepository brandRepository;
  private final BrandMapper brandMapper;

  @Override
  public BrandDto createBrand(BrandDto brandDto) {
    BrandEntity entity = brandMapper.toEntity(brandDto);
    BrandEntity saved = brandRepository.save(entity);
    return brandMapper.toDto(saved);
  }

  @Override
  public BrandDto getBrandById(Long id) {
    BrandEntity entity = brandRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Brand not found with id " + id));
    return brandMapper.toDto(entity);
  }

  @Override
  public List<BrandDto> getAllBrands() {
    // Replace collect(Collectors.toList()) with Stream.toList() to get an unmodifiable list
    return brandRepository.findAll().stream()
        .map(brandMapper::toDto)
        .toList();
  }

  @Override
  public BrandDto updateBrand(Long id, BrandDto brandDto) {
    BrandEntity entity = brandRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Brand not found with id " + id));
    brandMapper.updateEntityFromDto(brandDto, entity);
    BrandEntity updated = brandRepository.save(entity);
    return brandMapper.toDto(updated);
  }

  @Override
  public void deleteBrand(Long id) {
    if (!brandRepository.existsById(id)) {
      throw new EntityNotFoundException("Brand not found with id " + id);
    }
    brandRepository.deleteById(id);
  }
}
