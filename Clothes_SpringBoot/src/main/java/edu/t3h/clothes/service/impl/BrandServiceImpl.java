package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.exception.HandleUploadFileException;
import edu.t3h.clothes.mapper.BrandMapper;
import edu.t3h.clothes.mapper.ImageMapper;
import edu.t3h.clothes.model.dto.BrandDto;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.BrandRepository;
import edu.t3h.clothes.repository.ImageRepository;
import edu.t3h.clothes.service.IBrandService;
import edu.t3h.clothes.service.IUploadService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements IBrandService {

  private final BrandRepository brandRepository;
  private final BrandMapper brandMapper;
  private final IUploadService uploadService;
  private final ImageMapper imageMapper;
  private final ImageRepository imageRepository;

  @Override
  public BaseResponse<BrandDto> createBrand(BrandDto brandDto, MultipartFile file) {
    BaseResponse<BrandDto> response = new BaseResponse<>();
    BrandEntity brandEntity = brandMapper.toEntity(brandDto);
    if (file == null || file.isEmpty()) {
      throw new HandleUploadFileException("File is null or empty");
    }
    ImageDto imageDto = null;
    try {
      imageDto = uploadService.uploadImage(file);
      ImagesEntity iEntity = imageMapper.toEntity(imageDto);
      imageRepository.save(iEntity);
      brandEntity.setImage(iEntity);
    } catch (IOException e) {
      throw new HandleUploadFileException("Upload image error");
    }
    brandEntity.setDeleted(false);
    brandEntity.setCode(GenarateCode.generateAccountCode());
    brandEntity = brandRepository.save(brandEntity);
    response.setData(brandMapper.toDto(brandEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<BrandDto> getBrandById(Long id) {
    BaseResponse<BrandDto> response = new BaseResponse<>();
    Optional<BrandEntity> check = brandRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    response.setData(brandMapper.toDto(check.get()));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<List<BrandDto>> getBrands(Pageable pageable) {
    Page<BrandEntity> page = brandRepository.findDeletedBrands(pageable);
    List<BrandDto> dtos = page.stream().map(brandMapper::toDto).toList();
    ResponsePage<List<BrandDto>> resp = new ResponsePage<>();
    resp.setContent(dtos);
    resp.setPageNumber(page.getNumber());
    resp.setPageSize(page.getSize());
    resp.setTotalElements(page.getTotalElements());
    resp.setTotalPages(page.getTotalPages());
    return resp;
  }

  @Override
  public BaseResponse<BrandDto> updateBrand(Long id, BrandDto brandDto, MultipartFile file) {
    BaseResponse<BrandDto> response = new BaseResponse<>();

    Optional<BrandEntity> optionalBrand = brandRepository.findById(id);
    if (optionalBrand.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }

    BrandEntity brandEntity = optionalBrand.get();
    brandEntity.setId(id);
    brandEntity.setName(brandDto.getName());
    brandEntity.setDescription(brandDto.getDescription());
    brandEntity.setDeleted(false);
    if (file != null && !file.isEmpty()) {
      try {
        ImagesEntity oldImage = brandEntity.getImage();
        if (oldImage != null) {
          brandEntity.setImage(null);
          brandRepository.save(brandEntity);
          uploadService.deleteImage(oldImage.getPublicId());
          imageRepository.delete(oldImage);
        }
        ImageDto imageDto = uploadService.uploadImage(file);
        ImagesEntity newImage = new ImagesEntity();
        newImage.setUrl(imageDto.getUrl());
        newImage.setPublicId(imageDto.getPublicId());
        newImage.setType(file.getContentType());
        imageRepository.save(newImage);
        brandEntity.setImage(newImage);
      } catch (IOException e) {
        throw new HandleUploadFileException("Upload image error");
      }
    }

    brandEntity = brandRepository.save(brandEntity);
    response.setData(brandMapper.toDto(brandEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }


  @Override
  public BaseResponse<BrandDto> deleteBrand(Long id) {
    BaseResponse<BrandDto> response = new BaseResponse<>();
    Optional<BrandEntity> check = brandRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    BrandEntity brandEntity = check.get();
    brandRepository.delete(brandEntity);
    response.setData(brandMapper.toDto(brandEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<List<BrandDto>> findByName(String name, Pageable pageable) {
    ResponsePage<List<BrandDto>> response = new ResponsePage<>();
    Page<BrandEntity> page = brandRepository.findBrandsByName(name, pageable);
    List<BrandDto> dtos = page.stream().map(brandMapper::toDto).toList();
    response.setContent(dtos);
    response.setPageNumber(page.getNumber());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }
}