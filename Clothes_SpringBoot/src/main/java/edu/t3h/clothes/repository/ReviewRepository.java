package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ReviewEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

  @Query(value = "SELECT r FROM ReviewEntity r WHERE r.deleted=false")
  Page<ReviewEntity> getDeletedReviews(Pageable pageable);

  @Query(value = "SELECT r FROM ReviewEntity r WHERE r.deleted=false AND r.productEntity.id =:productId")
  Page<ReviewEntity> getDeletedReviewsByProductId(@Param("productId") Long productId,
      Pageable pageable);
}
