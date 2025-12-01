package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.BrandEntity;
import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.exception.HandleUploadFileException;
import edu.t3h.clothes.mapper.ImageMapper;
import edu.t3h.clothes.mapper.ProductMapper;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.dto.ProductDto;
import edu.t3h.clothes.model.dto.ProductIndex;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.BrandRepository;
import edu.t3h.clothes.repository.CategoryRepository;
import edu.t3h.clothes.repository.ImageRepository;
import edu.t3h.clothes.repository.ProductElasticsearchRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.service.IProductService;
import edu.t3h.clothes.service.IUploadService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
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
  private final ProductElasticsearchRepository elasticsearchRepository;

  @Override
  public ResponsePage<List<ProductDto>> getAllProducts(String code, String name, Long cateId,
      Long brandId, Pageable pageable) {
    ResponsePage<List<ProductDto>> responsePage = new ResponsePage<>();
    Page<ProductEntity> page = productRepository.findDeletedProducts(code, name, cateId, brandId,
        pageable);
    List<ProductDto> list = page.getContent().stream().map(productMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(list);
    return responsePage;
  }


  @Override
  public BaseResponse<ProductDto> createProduct(ProductDto productDto, List<MultipartFile> file) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    ProductEntity productEntity = productMapper.toEntity(productDto);
    productEntity.setCode(GenarateCode.generateAccountCode());
    productEntity.setDeleted(false);
    Optional<CategoryEntity> categoryEntity = categoryRepository.findById(
        productDto.getCategoryId());
    if (categoryEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Category not found with id " + productDto.getCategoryId());
      return response;
    }
    Optional<BrandEntity> brandEntity = brandRepository.findById(productDto.getBrandId());
    if (brandEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Brand not found with id " + productDto.getBrandId());
      return response;
    }

    productEntity.setCategoryEntity(categoryEntity.get());
    productEntity.setBrandEntity(brandEntity.get());
    productEntity = productRepository.save(productEntity);
    if (file == null || file.isEmpty()) {
      throw new HandleUploadFileException("File is null or empty");
    }
    List<ImageDto> imageDto = iUploadService.uploadImages(file);
    final ProductEntity finalProductEntity = productEntity;
    List<ImagesEntity> imagesEntityList = imageDto.stream().map(imageDto1 -> {
      ImagesEntity imagesEntity = imageMapper.toEntity(imageDto1);
      imagesEntity.setProductEntity(finalProductEntity);
      return imagesEntity;
    }).toList();
    imageRepository.saveAll(imagesEntityList);
    productDto.setImageDtos(imageDto);
    productDto = productMapper.toDto(productEntity);
    response.setData(productDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<ProductDto> updateProduct(Long id, ProductDto productDto,
      List<MultipartFile> file) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    Optional<ProductEntity> check = productRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Product not found with id : " + id);
      return response;
    }
    Optional<CategoryEntity> checkCate = categoryRepository.findById(productDto.getCategoryId());
    if (checkCate.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Category not found with id : " + productDto.getCategoryId());
      return response;
    }
    Optional<BrandEntity> checkBrand = brandRepository.findById(productDto.getBrandId());
    if (checkBrand.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Brand not found with id : " + productDto.getBrandId());
      return response;
    }

    ProductEntity product = check.get();
    product.setId(id);
    product.setName(productDto.getName());
    product.setDescription(productDto.getDescription());
    product.setSortDescription(productDto.getSortDescription());
    product.setCategoryEntity(checkCate.get());
    product.setBrandEntity(checkBrand.get());
    productRepository.save(product);
    if (file != null && !file.isEmpty()) {
      List<ImagesEntity> imagesEntityList = imageRepository.findByProductId(product.getId());
      if (!imagesEntityList.isEmpty()) {
        for (ImagesEntity imagesEntity : imagesEntityList) {
          iUploadService.deleteImage(imagesEntity.getPublicId());
          imageRepository.delete(imagesEntity);
        }
      }
      List<ImageDto> uploadedImages = iUploadService.uploadImages(file);
      final ProductEntity finalProductEntity = product;
      List<ImagesEntity> newImagesEntityList = uploadedImages.stream()
          .map(imageDto -> {
            ImagesEntity imagesEntity = imageMapper.toEntity(imageDto);
            imagesEntity.setProductEntity(finalProductEntity);
            return imagesEntity;
          })
          .toList();
      imageRepository.saveAll(newImagesEntityList);
    }
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
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProductEntity productEntity = check.get();
    productEntity.setDeleted(true);
    productRepository.save(productEntity);
    ProductDto productDto = productMapper.toDto(productEntity);
    response.setData(productDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<ProductDto> getProductById(Long id) {
    BaseResponse<ProductDto> response = new BaseResponse<>();
    Optional<ProductEntity> check = productRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    ProductEntity product = check.get();
    ProductDto productDto = productMapper.toDto(product);
    response.setData(productDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<List<ProductDto>> findProductsByCondition(String code, String name,
      Long cateId, Long brandId, Pageable pageable) {
    ResponsePage<List<ProductDto>> responsePage = new ResponsePage<>();
    Page<ProductEntity> page = productRepository.findProductsByCondition(code, name, cateId,
        brandId, pageable);
    List<ProductDto> productDtos = page.getContent().stream().map(productMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(productDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<List<ProductDto>> bestSellerBook() {
    BaseResponse<List<ProductDto>> baseResponse = new BaseResponse<>();
    List<ProductEntity> bookEntities = productRepository.bestSellerProduct();
    List<ProductDto> bookDtos = bookEntities.stream().map(productMapper::toDto).toList();
    baseResponse.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    baseResponse.setCode(HttpStatus.OK.value());
    baseResponse.setData(bookDtos);
    return baseResponse;
  }

  @Override
  public BaseResponse<List<ProductDto>> newArrivedBook() {
    BaseResponse<List<ProductDto>> response = new BaseResponse<>();
    LocalDateTime dateTime = LocalDateTime.now().minusDays(5);
    List<ProductEntity> bookEntities = productRepository.newBook(dateTime);
    List<ProductDto> bookDtos = bookEntities.stream().map(productMapper::toDto).toList();
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    response.setData(bookDtos);
    return response;
  }

  @Override
  public List<ProductDto> searchByName(String name) {
    List<ProductIndex> results = elasticsearchRepository.findByNameContainingIgnoreCase(name);
    return results.stream()
        .map(productMapper::toDto2)
        .toList();
  }
}
