package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ImagesEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImagesEntity, Long> {

  @Query(value = "SELECT i FROM ImagesEntity i WHERE i.accountEntity.id =:accountId")
  ImagesEntity findByAccountId(Long accountId);

  @Query(value = "SELECT i FROM ImagesEntity i WHERE i.productEntity.id =:productId")
  List<ImagesEntity> findByProductId(Long productId);
}
