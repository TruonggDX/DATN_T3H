package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.ReviewEntity;
import edu.t3h.clothes.mapper.ReviewMapper;
import edu.t3h.clothes.model.dto.ReviewDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.ReviewRepository;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.IReviewService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.apache.poi.sl.draw.geom.GuideIf.Op;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements IReviewService {

  private final ReviewRepository reviewRepository;
  private final ReviewMapper reviewMapper;
  private final ProductRepository productRepository;
  private final JwtService jwtService;
  private final AccountRepository accountRepository;

  @Override
  public ResponsePage<List<ReviewDto>> getAllReviews(Pageable pageable) {
    ResponsePage<List<ReviewDto>> responsePage = new ResponsePage<>();
    Page<ReviewEntity> page = reviewRepository.getDeletedReviews(pageable);
    List<ReviewDto> reviewDtos = page.getContent().stream().map(reviewMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(reviewDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<ReviewDto> addReview(ReviewDto reviewDto) {
    BaseResponse<ReviewDto> response = new BaseResponse<>();
    Optional<ProductEntity> check = productRepository.findById(reviewDto.getProductId());
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Product not found with id: " + reviewDto.getProductId());
      return response;
    }
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<AccountEntity> checkAccount = accountRepository.findByEmail(email);
    if (checkAccount.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Account not found with email: " + email);
      return response;
    }
    ReviewEntity reviewEntity = reviewMapper.toEntity(reviewDto);
    reviewEntity.setDeleted(false);
    reviewEntity.setCode(GenarateCode.generateAccountCode());
    reviewEntity.setProductEntity(check.get());
    reviewEntity.setAccount(checkAccount.get());
    reviewRepository.save(reviewEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(reviewMapper.toDto(reviewEntity));
    return response;
  }

  @Override
  public BaseResponse<ReviewDto> updateReview(Long id, ReviewDto reviewDto) {
    BaseResponse<ReviewDto> response = new BaseResponse<>();
    Optional<ReviewEntity> check = reviewRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Review not found with id: " + id);
      return response;
    }
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<AccountEntity> checkAccount = accountRepository.findByEmail(email);
    if (checkAccount.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Account not found with email: " + email);
      return response;
    }
    ReviewEntity reviewEntity = check.get();
    reviewEntity.setRating(reviewDto.getRating());
    reviewEntity.setComment(reviewDto.getComment());
    reviewEntity.setDeleted(false);
    reviewRepository.save(reviewEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(reviewMapper.toDto(reviewEntity));
    return response;
  }

  @Override
  public BaseResponse<ReviewDto> deleteReview(Long id) {
    BaseResponse<ReviewDto> response = new BaseResponse<>();
    Optional<ReviewEntity> check = reviewRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Review not found with id " + id);
      return response;
    }
    ReviewEntity review = check.get();
    review.setDeleted(true);
    reviewRepository.save(review);
    response.setCode(HttpStatus.OK.value());
    response.setData(reviewMapper.toDto(review));
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    return response;
  }

  @Override
  public BaseResponse<ReviewDto> getReviewById(Long id) {
    BaseResponse<ReviewDto> response = new BaseResponse<>();
    Optional<ReviewEntity> check = reviewRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Review not found with id " + id);
      return response;
    }
    ReviewEntity reviewEntity = check.get();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(reviewMapper.toDto(reviewEntity));
    return response;
  }

  @Override
  public ResponsePage<List<ReviewDto>> getReviewsByProductId(Long productId, Pageable pageable) {
    ResponsePage<List<ReviewDto>> responsePage = new ResponsePage<>();
    Page<ReviewEntity> page = reviewRepository.getDeletedReviewsByProductId(productId, pageable);
    List<ReviewDto> reviewDtos = page.getContent().stream().map(reviewMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(reviewDtos);
    return responsePage;
  }
}
