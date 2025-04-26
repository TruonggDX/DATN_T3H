//package edu.t3h.clothes.service.impl;
//
//import edu.t3h.clothes.entity.ProductEntity;
//import edu.t3h.clothes.entity.VoucherEntity;
//import edu.t3h.clothes.mapper.VoucherMapper;
//import edu.t3h.clothes.model.dto.VoucherDto;
//import edu.t3h.clothes.model.response.BaseResponse;
//import edu.t3h.clothes.model.response.ResponsePage;
//import edu.t3h.clothes.repository.ProductRepository;
//import edu.t3h.clothes.repository.VoucherRepository;
//import edu.t3h.clothes.service.IVoucherService;
//import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
//import edu.t3h.clothes.utils.GenarateCode;
//import java.util.Set;
//import java.util.stream.Collectors;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class VoucherServiceImpl implements IVoucherService {
//
//  private final VoucherRepository voucherRepository;
//  private final VoucherMapper voucherMapper;
//  private final ProductRepository productRepository;
//
//  public VoucherServiceImpl(VoucherRepository voucherRepository, VoucherMapper voucherMapper,
//      ProductRepository productRepository) {
//    this.voucherRepository = voucherRepository;
//    this.voucherMapper = voucherMapper;
//    this.productRepository = productRepository;
//  }
//
//  @Override
//  public BaseResponse<VoucherDto> createVoucher(VoucherDto voucherDto) {
//    BaseResponse<VoucherDto> response = new BaseResponse<>();
//    VoucherEntity voucherEntity = voucherMapper.toEntity(voucherDto);
//    voucherEntity.setDeleted(false);
//    voucherEntity.setCode(GenarateCode.generateAccountCode());
//    Set<ProductEntity> products = voucherDto.getProductIds().stream().map(id -> productRepository.findById(id).orElse(null)).collect(Collectors.toSet());
//    voucherEntity.setProducts(products);
//    voucherEntity = voucherRepository.save(voucherEntity);
//    voucherDto = voucherMapper.toDto(voucherEntity);
//    Set<Long> productIds = voucherEntity.getProducts().stream().map(ProductEntity::getId).collect(
//        Collectors.toSet());
//    voucherDto.setProductIds(productIds);
//    response.setData(voucherDto);
//    response.setMessage(HTTP_MESSAGE.SUCCESS);
//    response.setCode(HttpStatus.CREATED.value());
//    return response;
//  }
//
//  @Override
//  public BaseResponse<VoucherDto> getVoucherById(Long id) {
//    BaseResponse<VoucherDto> response = new BaseResponse<>();
//    Optional<VoucherEntity> voucherEntityOpt = voucherRepository.findById(id);
//    if (voucherEntityOpt.isEmpty()) {
//      response.setCode(HttpStatus.NOT_FOUND.value());
//      response.setMessage(HTTP_MESSAGE.FAILED);
//      return response;
//    }
//    response.setData(voucherMapper.toDto(voucherEntityOpt.get()));
//    response.setMessage(HTTP_MESSAGE.SUCCESS);
//    response.setCode(HttpStatus.OK.value());
//    return response;
//  }
//
//  @Override
//  public ResponsePage<VoucherDto> getVouchers(Pageable pageable) {
//    Page<VoucherEntity> page = voucherRepository.findAllActive(pageable);
//    ResponsePage<VoucherDto> response = new ResponsePage<>();
//    response.setListContent(page.stream().map(voucherMapper::toDto).toList());
//    response.setPageNumber(page.getNumber());
//    response.setPageSize(page.getSize());
//    response.setTotalElements(page.getTotalElements());
//    response.setTotalPages(page.getTotalPages());
//    return response;
//  }
//
//  @Override
//  public BaseResponse<VoucherDto> updateVoucher(Long id, VoucherDto voucherDto) {
//    BaseResponse<VoucherDto> response = new BaseResponse<>();
//    Optional<VoucherEntity> voucherEntityOpt = voucherRepository.findById(id);
//    if (voucherEntityOpt.isEmpty()) {
//      response.setCode(HttpStatus.NOT_FOUND.value());
//      response.setMessage(HTTP_MESSAGE.FAILED);
//      return response;
//    }
//    VoucherEntity voucherEntity = voucherEntityOpt.get();
//    voucherEntity.setCode(voucherDto.getCode());
//    voucherEntity.setName(voucherDto.getName());
//    voucherEntity.setDescription(voucherDto.getDescription());
//    voucherEntity.setDescriptionType(voucherDto.getDescriptionType());
//    voucherEntity.setDiscountValue(voucherDto.getDiscountValue());
//    voucherEntity.setMinOrderAmount(voucherDto.getMinOrderAmount());
//    voucherEntity.setQuantity(voucherDto.getQuantity());
//    voucherEntity.setStatus(voucherDto.getStatus());
//    voucherEntity.setStartDate(voucherDto.getStartDate());
//    voucherEntity.setEndDate(voucherDto.getEndDate());
//
//    Set<ProductEntity> products = voucherDto.getProductIds().stream()
//        .map(productId -> productRepository.findById(productId).orElse(null))
//        .filter(p -> p != null)
//        .collect(Collectors.toSet());
//
//    voucherEntity.getProducts().clear();
//    voucherEntity.getProducts().addAll(products);
//    voucherEntity = voucherRepository.save(voucherEntity);
//    response.setData(voucherMapper.toDto(voucherEntity));
//    response.setMessage(HTTP_MESSAGE.SUCCESS);
//    response.setCode(HttpStatus.OK.value());
//    return response;
//  }
//
//
//  @Override
//  public BaseResponse<VoucherDto> deleteVoucher(Long id) {
//    BaseResponse<VoucherDto> response = new BaseResponse<>();
//    Optional<VoucherEntity> voucherEntityOpt = voucherRepository.findById(id);
//    if (voucherEntityOpt.isEmpty()) {
//      response.setCode(HttpStatus.NOT_FOUND.value());
//      response.setMessage(HTTP_MESSAGE.FAILED);
//      return response;
//    }
//    VoucherEntity voucherEntity = voucherEntityOpt.get();
//    voucherEntity.setDeleted(true);
//    voucherRepository.save(voucherEntity);
//    response.setData(voucherMapper.toDto(voucherEntity));
//    response.setMessage(HTTP_MESSAGE.SUCCESS);
//    response.setCode(HttpStatus.OK.value());
//    return response;
//  }
//
//  @Override
//  public ResponsePage<VoucherDto> searchVoucherByCode(String code, Pageable pageable) {
//    ResponsePage<VoucherDto> response = new ResponsePage<>();
//    Page<VoucherEntity> page = voucherRepository.findByCode(code, pageable);
//    response.setListContent(page.stream().map(voucherMapper::toDto).toList());
//    response.setPageNumber(page.getNumber());
//    response.setPageSize(page.getSize());
//    response.setTotalElements(page.getTotalElements());
//    response.setTotalPages(page.getTotalPages());
//    return response;
//  }
//}


package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.mapper.VoucherMapper;
import edu.t3h.clothes.mapper.ProductMapper;
import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.VoucherRepository;
import edu.t3h.clothes.service.IVoucherService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class VoucherServiceImpl implements IVoucherService {

  private final VoucherRepository voucherRepository;
  private final VoucherMapper voucherMapper;
  private final ProductRepository productRepository;
  private final ProductMapper productMapper;

  public VoucherServiceImpl(VoucherRepository voucherRepository, VoucherMapper voucherMapper,
      ProductRepository productRepository, ProductMapper productMapper) {
    this.voucherRepository = voucherRepository;
    this.voucherMapper = voucherMapper;
    this.productRepository = productRepository;
    this.productMapper = productMapper;
  }

  @Override
  public BaseResponse<VoucherDto> createVoucher(VoucherDto voucherDto) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    VoucherEntity voucherEntity = voucherMapper.toEntity(voucherDto);
    voucherEntity.setDeleted(false);
    voucherEntity.setCode(GenarateCode.generateAccountCode());
    voucherEntity.setStatus(false); // Mặc định là false

    Set<ProductEntity> products = voucherDto.getProductIds().stream()
        .map(id -> productRepository.findById(id).orElse(null))
        .filter(p -> p != null)
        .collect(Collectors.toSet());

    voucherEntity.setProducts(products);
    voucherEntity = voucherRepository.save(voucherEntity);

    // Mapping DTO kèm thông tin sản phẩm
    VoucherDto dto = voucherMapper.toDto(voucherEntity);
    dto.setProductIds(products.stream().map(ProductEntity::getId).collect(Collectors.toSet()));
    dto.setProducts(products.stream().map(productMapper::toDto).collect(Collectors.toSet()));

    response.setData(dto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.CREATED.value());
    return response;
  }

  @Override
  public BaseResponse<VoucherDto> getVoucherById(Long id) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    Optional<VoucherEntity> voucherOpt = voucherRepository.findById(id);
    if (voucherOpt.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VoucherEntity voucher = voucherOpt.get();
    VoucherDto dto = voucherMapper.toDto(voucher);
    dto.setProductIds(voucher.getProducts().stream().map(ProductEntity::getId).collect(Collectors.toSet()));
    dto.setProducts(voucher.getProducts().stream().map(productMapper::toDto).collect(Collectors.toSet()));

    response.setData(dto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<VoucherDto> getVouchers(Pageable pageable) {
    Page<VoucherEntity> page = voucherRepository.findAllActive(pageable);
    ResponsePage<VoucherDto> response = new ResponsePage<>();

    response.setListContent(
        page.stream().map(voucher -> {
          VoucherDto dto = voucherMapper.toDto(voucher);
          dto.setProductIds(voucher.getProducts().stream().map(ProductEntity::getId).collect(Collectors.toSet()));
          dto.setProducts(voucher.getProducts().stream().map(productMapper::toDto).collect(Collectors.toSet()));
          return dto;
        }).toList()
    );

    response.setPageNumber(page.getNumber());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }

  @Override
  public BaseResponse<VoucherDto> updateVoucher(Long id, VoucherDto voucherDto) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    Optional<VoucherEntity> voucherEntityOpt = voucherRepository.findById(id);
    if (voucherEntityOpt.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VoucherEntity voucherEntity = voucherEntityOpt.get();

    voucherEntity.setCode(voucherDto.getCode());
    voucherEntity.setName(voucherDto.getName());
    voucherEntity.setDescription(voucherDto.getDescription());
    voucherEntity.setDescriptionType(voucherDto.getDescriptionType());
    voucherEntity.setDiscountValue(voucherDto.getDiscountValue());
    voucherEntity.setMinOrderAmount(voucherDto.getMinOrderAmount());
    voucherEntity.setQuantity(voucherDto.getQuantity());
    voucherEntity.setStatus(voucherDto.getStatus());
    voucherEntity.setStartDate(voucherDto.getStartDate());
    voucherEntity.setEndDate(voucherDto.getEndDate());

    Set<ProductEntity> products = voucherDto.getProductIds().stream()
        .map(productId -> productRepository.findById(productId).orElse(null))
        .filter(p -> p != null)
        .collect(Collectors.toSet());

    voucherEntity.getProducts().clear();
    voucherEntity.getProducts().addAll(products);
    voucherEntity = voucherRepository.save(voucherEntity);

    VoucherDto dto = voucherMapper.toDto(voucherEntity);
    dto.setProductIds(products.stream().map(ProductEntity::getId).collect(Collectors.toSet()));
    dto.setProducts(products.stream().map(productMapper::toDto).collect(Collectors.toSet()));

    response.setData(dto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<VoucherDto> deleteVoucher(Long id) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    Optional<VoucherEntity> voucherEntityOpt = voucherRepository.findById(id);
    if (voucherEntityOpt.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VoucherEntity voucherEntity = voucherEntityOpt.get();
    voucherEntity.setDeleted(true);
    voucherRepository.save(voucherEntity);

    VoucherDto dto = voucherMapper.toDto(voucherEntity);
    dto.setProductIds(voucherEntity.getProducts().stream().map(ProductEntity::getId).collect(Collectors.toSet()));
    dto.setProducts(voucherEntity.getProducts().stream().map(productMapper::toDto).collect(Collectors.toSet()));

    response.setData(dto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<VoucherDto> searchVoucherByCode(String code, Pageable pageable) {
    ResponsePage<VoucherDto> response = new ResponsePage<>();
    Page<VoucherEntity> page = voucherRepository.findByCode(code, pageable);

    response.setListContent(
        page.stream().map(voucher -> {
          VoucherDto dto = voucherMapper.toDto(voucher);
          dto.setProductIds(voucher.getProducts().stream().map(ProductEntity::getId).collect(Collectors.toSet()));
          dto.setProducts(voucher.getProducts().stream().map(productMapper::toDto).collect(Collectors.toSet()));
          return dto;
        }).toList()
    );

    response.setPageNumber(page.getNumber());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }
}
