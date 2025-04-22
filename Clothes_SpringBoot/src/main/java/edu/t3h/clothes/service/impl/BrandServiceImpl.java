package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.mapper.BrandMapper;
import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.BrandRepository;
import edu.t3h.clothes.service.IBrandService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
  public ResponsePage<List<BrandDto>> getBrands(Pageable pageable) {
    Page<BrandEntity> page = brandRepository.findAll(pageable);
    List<BrandDto> dtos = page.stream()
        .map(brandMapper::toDto)
        .toList();

    ResponsePage<List<BrandDto>> resp = new ResponsePage<>();
    resp.setContent(dtos);
    resp.setPageNumber(page.getNumber());
    resp.setPageSize(page.getSize());
    resp.setTotalElements(page.getTotalElements());
    resp.setTotalPages(page.getTotalPages());
    return resp;
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