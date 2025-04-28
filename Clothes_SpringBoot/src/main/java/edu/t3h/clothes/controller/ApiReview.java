package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.ReviewDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IReviewService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/review")
@AllArgsConstructor
public class ApiReview {

  private final IReviewService reviewService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<ReviewDto>>> getAllReviews(Pageable pageable) {
    ResponsePage<List<ReviewDto>> reviews = reviewService.getAllReviews(pageable);
    return ResponseEntity.ok(reviews);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<ReviewDto>> createReview(@RequestBody ReviewDto reviewDto) {
    BaseResponse<ReviewDto> response = reviewService.addReview(reviewDto);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<ReviewDto>> getReviewById(@PathVariable Long id) {
    BaseResponse<ReviewDto> response = reviewService.getReviewById(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<ReviewDto>> updateReview(@PathVariable Long id,
      @RequestBody ReviewDto reviewDto) {
    BaseResponse<ReviewDto> response = reviewService.updateReview(id, reviewDto);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<ReviewDto>> deleteReview(@PathVariable Long id) {
    BaseResponse<ReviewDto> response = reviewService.deleteReview(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findReviewByProductId/{productId}")
  public ResponseEntity<ResponsePage<List<ReviewDto>>> getReviewByProductId(
      @PathVariable Long productId, Pageable pageable) {
    ResponsePage<List<ReviewDto>> responsePage = reviewService.getReviewsByProductId(productId,
        pageable);
    return ResponseEntity.ok(responsePage);
  }
}
