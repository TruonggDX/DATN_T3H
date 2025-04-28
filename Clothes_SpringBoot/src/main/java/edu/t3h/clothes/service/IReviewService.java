package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.ReviewDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface IReviewService {

  ResponsePage<List<ReviewDto>> getAllReviews(Pageable pageable);

  BaseResponse<ReviewDto> addReview(ReviewDto reviewDto);

  BaseResponse<ReviewDto> updateReview(Long id, ReviewDto reviewDto);

  BaseResponse<ReviewDto> deleteReview(Long id);

  BaseResponse<ReviewDto> getReviewById(Long id);

  ResponsePage<List<ReviewDto>> getReviewsByProductId(Long productId, Pageable pageable);
}
