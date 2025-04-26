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
import java.util.HashSet;
import java.util.List;
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
  public ResponsePage<List<VoucherDto>> getVouchers(Pageable pageable) {
    ResponsePage<List<VoucherDto>> responsePage = new ResponsePage<>();
    Page<VoucherEntity> page = voucherRepository.findAllActive(pageable);
    List<VoucherDto> variantDtos = page.getContent().stream().map(entity -> {
      VoucherDto variantDto = voucherMapper.toDto(entity);
      Set<Long> attributeValuesId = entity.getProductEntities().stream()
          .map(ProductEntity::getId).collect(Collectors.toSet());
      variantDto.setProductIds(attributeValuesId);
      return variantDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(variantDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<VoucherDto> createVoucher(VoucherDto voucherDto) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    VoucherEntity voucherEntity = voucherMapper.toEntity(voucherDto);
    voucherEntity.setDeleted(false);
    voucherEntity.setCode(GenarateCode.generateAccountCode());
    Set<ProductEntity> productEntities = voucherDto.getProductIds().stream()
        .map(productIds -> productRepository.findById(productIds).orElse(null)).collect(
            Collectors.toSet());
    voucherEntity.setProductEntities(productEntities);
    voucherRepository.save(voucherEntity);
    voucherDto = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = showProductIds(voucherEntity.getProductEntities());
    voucherDto.setProductIds(productIds);
    response.setData(voucherDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.CREATED.value());
    return response;
  }

  @Override
  public BaseResponse<VoucherDto> getVoucherById(Long id) {
    BaseResponse<VoucherDto> response = new BaseResponse<>();
    Optional<VoucherEntity> check = voucherRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    VoucherEntity voucherEntity = check.get();
    VoucherDto voucherDto = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = showProductIds(voucherEntity.getProductEntities());
    voucherDto.setProductIds(productIds);
    response.setData(voucherDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
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
    VoucherEntity voucherEntity = voucherMapper.toEntity(voucherDto);
    voucherEntity.setId(id);
    Set<ProductEntity> productEntities = new HashSet<>();
    for (Long productId : voucherDto.getProductIds()) {
      ProductEntity productEntity = productRepository.findById(productId).orElse(null);
      if (productEntity != null) {
        productEntities.add(productEntity);
      }
    }
    voucherEntity.setProductEntities(productEntities);
    voucherEntity = voucherRepository.save(voucherEntity);
    VoucherDto voucher = voucherMapper.toDto(voucherEntity);
    Set<Long> productIds = showProductIds(voucherEntity.getProductEntities());
    voucher.setProductIds(productIds);
    response.setData(voucher);
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
    Set<Long> productIds = showProductIds(voucherEntity.getProductEntities());
    voucherDto.setProductIds(productIds);
    response.setData(voucherDto);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public ResponsePage<List<VoucherDto>> searchVoucherByCondition(String code, String name,
      Boolean status, Pageable pageable) {
    ResponsePage<List<VoucherDto>> responsePage = new ResponsePage<>();
    Page<VoucherEntity> page = voucherRepository.findByCondition(code, name, status, pageable);
    List<VoucherDto> voucherDtos = page.getContent().stream().map(voucherEntity -> {
      VoucherDto voucher = voucherMapper.toDto(voucherEntity);
      Set<Long> productIds = showProductIds(voucherEntity.getProductEntities());
      voucher.setProductIds(productIds);
      return voucher;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(voucherDtos);
    return responsePage;
  }

  private Set<Long> showProductIds(Set<ProductEntity> productEntities) {
    return productEntities.stream().map(ProductEntity::getId).collect(Collectors.toSet());
  }
}