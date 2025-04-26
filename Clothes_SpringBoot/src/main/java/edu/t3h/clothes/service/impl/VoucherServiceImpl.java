package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.mapper.VoucherMapper;
import edu.t3h.clothes.model.dto.VoucherDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.VoucherRepository;
import edu.t3h.clothes.service.IVoucherService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements IVoucherService {

  private final VoucherRepository voucherRepository;
  private final VoucherMapper voucherMapper;
  private final ProductRepository productRepository;

  @Override
  public BaseResponse<VoucherDto> createVoucher(VoucherDto voucherDto) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    VoucherEntity voucherEntity = voucherMapper.toEntity(voucherDto);
    voucherEntity.setDeleted(false);
    voucherEntity.setCode(GenarateCode.generateAccountCode());

    Set<ProductEntity> products = voucherDto.getProductIds().stream()
        .map(productRepository::findById)
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toSet());

    voucherEntity.setProducts(products);
    voucherEntity = voucherRepository.save(voucherEntity);

    VoucherDto savedVoucherDto = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = voucherEntity.getProducts().stream()
        .map(ProductEntity::getId)
        .collect(Collectors.toSet());
    savedVoucherDto.setProductIds(productIds);

    response.setData(savedVoucherDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.CREATED.value());
    return response;
  }

  @Override
  public BaseResponse<VoucherDto> getVoucherById(Long id) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    Optional<VoucherEntity> voucherEntityOpt = voucherRepository.findById(id);
    if (voucherEntityOpt.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }

    VoucherEntity voucherEntity = voucherEntityOpt.get();
    VoucherDto voucherDto = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = voucherEntity.getProducts().stream()
        .map(ProductEntity::getId)
        .collect(Collectors.toSet());
    voucherDto.setProductIds(productIds);

    response.setData(voucherDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<VoucherDto> getVouchers(Pageable pageable) {
    Page<VoucherEntity> page = voucherRepository.findAllActive(pageable);

    ResponsePage<VoucherDto> response = new ResponsePage<>();
    response.setListContent(page.getContent().stream()
        .map(entity -> {
          VoucherDto dto = voucherMapper.toDto(entity);
          Set<Long> productIds = entity.getProducts().stream()
              .map(ProductEntity::getId)
              .collect(Collectors.toSet());
          dto.setProductIds(productIds);
          return dto;
        })
        .collect(Collectors.toList()));
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
        .map(productRepository::findById)
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toSet());

    voucherEntity.getProducts().clear();
    voucherEntity.getProducts().addAll(products);
    voucherEntity = voucherRepository.save(voucherEntity);

    VoucherDto updatedVoucherDto = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = voucherEntity.getProducts().stream()
        .map(ProductEntity::getId)
        .collect(Collectors.toSet());
    updatedVoucherDto.setProductIds(productIds);

    response.setData(updatedVoucherDto);
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

    VoucherDto voucherDto = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = voucherEntity.getProducts().stream()
        .map(ProductEntity::getId)
        .collect(Collectors.toSet());
    voucherDto.setProductIds(productIds);

    response.setData(voucherDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<VoucherDto> searchVoucherByCode(String code, Pageable pageable) {
    Page<VoucherEntity> page = voucherRepository.findByCode(code, pageable);

    ResponsePage<VoucherDto> response = new ResponsePage<>();
    response.setListContent(page.getContent().stream()
        .map(entity -> {
          VoucherDto dto = voucherMapper.toDto(entity);
          Set<Long> productIds = entity.getProducts().stream()
              .map(ProductEntity::getId)
              .collect(Collectors.toSet());
          dto.setProductIds(productIds);
          return dto;
        })
        .collect(Collectors.toList()));
    response.setPageNumber(page.getNumber());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }

  @Override
  public ResponsePage<VoucherDto> searchVoucherByStatus(Boolean status, Pageable pageable) {
    Page<VoucherEntity> page = voucherRepository.findByStatus(status, pageable);

    ResponsePage<VoucherDto> response = new ResponsePage<>();
    response.setListContent(page.getContent().stream()
        .map(entity -> {
          VoucherDto dto = voucherMapper.toDto(entity);
          Set<Long> productIds = entity.getProducts().stream()
              .map(ProductEntity::getId)
              .collect(Collectors.toSet());
          dto.setProductIds(productIds);
          return dto;
        })
        .collect(Collectors.toList()));
    response.setPageNumber(page.getNumber());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }

  @Override
  public ResponsePage<VoucherDto> searchVoucherByName(String name, Pageable pageable) {
    Page<VoucherEntity> page = voucherRepository.findByName(name, pageable);

    ResponsePage<VoucherDto> response = new ResponsePage<>();
    response.setListContent(page.getContent().stream()
        .map(entity -> {
          VoucherDto dto = voucherMapper.toDto(entity);
          Set<Long> productIds = entity.getProducts().stream()
              .map(ProductEntity::getId)
              .collect(Collectors.toSet());
          dto.setProductIds(productIds);
          return dto;
        })
        .collect(Collectors.toList()));
    response.setPageNumber(page.getNumber());
    response.setPageSize(page.getSize());
    response.setTotalElements(page.getTotalElements());
    response.setTotalPages(page.getTotalPages());
    return response;
  }
}