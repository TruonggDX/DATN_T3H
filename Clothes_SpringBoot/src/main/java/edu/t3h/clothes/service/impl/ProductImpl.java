package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.mapper.ImageMapper;
import edu.t3h.clothes.mapper.ProductMapper;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.dto.ProductDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.BrandRepository;
import edu.t3h.clothes.repository.CategoryRepository;
import edu.t3h.clothes.repository.ImageRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.service.IProductService;
import edu.t3h.clothes.service.IUploadService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProductImpl implements IProductService {

  private final ProductRepository productRepository;
  private final ProductMapper productMapper;
  private final IUploadService iUploadService;
  private final ImageRepository imageRepository;
  private final ImageMapper imageMapper;
  private final CategoryRepository categoryRepository;
  private final BrandRepository brandRepository;

  @Override
  public ResponsePage<List<ProductDto>> getAllProducts(Pageable pageable) {
    ResponsePage<List<ProductDto>> responsePage = new ResponsePage<>();
    Page<ProductEntity> page = productRepository.findDeletedProducts(pageable);
    List<ProductDto> list = page.getContent().stream().map(productEntity -> {
      ProductDto productDto = productMapper.toDto(productEntity);
      Set<Long> voucherIds = showVoucherIds(productEntity.getVoucherEntities());
      productDto.setVoucherIds(voucherIds);
      List<ImagesEntity> listImage = imageRepository.findByProductId(productEntity.getId());
      List<ImageDto> imageDtoList = listImage.stream().map(imageMapper::toDto).toList();
      productDto.setImageDtos(imageDtoList);
      return productDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(list);
    return responsePage;
  }

  private Set<Long> showVoucherIds(Set<VoucherEntity> voucherEntities){
    return voucherEntities.stream().map(VoucherEntity::getId).collect(Collectors.toSet());
  }
  @Override
  public BaseResponse<ProductDto> createProduct(ProductDto productDto, MultipartFile file) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    ProductEntity productEntity = productMapper.toEntity(productDto);
    productEntity = productRepository.save(productEntity);
    response.setData(productMapper.toDto(productEntity));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<ProductDto> updateProduct(Long id, ProductDto productDto, MultipartFile file) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    Optional<ProductEntity> check = productRepository.findById(id);
    if (check.isEmpty()){
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    Optional<CategoryEntity> checkCate = categoryRepository.findById(productDto.getCategoryId());
    if (checkCate.isEmpty()){
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    Optional<BrandEntity> checkBrand = brandRepository.findById(productDto.getBrandId());
    if (checkBrand.isEmpty()){
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProductEntity product = productMapper.toEntity(productDto);
    product.setId(id);
    product.setCode(GenarateCode.generateAccountCode());
    product.setCategoryEntity(checkCate.get());
    product.setBrandEntity(checkBrand.get());
    productRepository.save(product);
    productDto = productMapper.toDto(product);
    response.setData(productDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<ProductDto> deleteProduct(Long id) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    Optional<ProductEntity> check = productRepository.findById(id);
    if (check.isEmpty()){
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProductEntity productEntity = check.get();
    productEntity.setDeleted(true);
    productRepository.save(productEntity);
    ProductDto productDto = productMapper.toDto(productEntity);
    Set<Long> voucherIds = productEntity.getVoucherEntities().stream().map(VoucherEntity::getId).collect(Collectors.toSet());
    productDto.setVoucherIds(voucherIds);
    List<ImagesEntity> listImage = imageRepository.findByProductId(productEntity.getId());
    List<ImageDto> imageDtoList = listImage.stream().map(imageMapper::toDto).toList();
    productDto.setImageDtos(imageDtoList);
    response.setData(productDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<ProductDto> getProductById(Long id) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    Optional<ProductEntity> check = productRepository.findById(id);
    if (check.isEmpty()){
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProductEntity product = check.get();
    ProductDto productDto = productMapper.toDto(product);
    Set<Long> voucherIds = product.getVoucherEntities().stream().map(VoucherEntity::getId).collect(Collectors.toSet());
    productDto.setVoucherIds(voucherIds);
    List<ImagesEntity> listImage = imageRepository.findByProductId(product.getId());
    List<ImageDto> imageDtoList = listImage.stream().map(imageMapper::toDto).toList();
    productDto.setImageDtos(imageDtoList);
    response.setData(productDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }
}
