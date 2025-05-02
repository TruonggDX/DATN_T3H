package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.BlogsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogsRepository extends JpaRepository<BlogsEntity, Long> {

  @Query(value = "SELECT b FROM BlogsEntity b WHERE b.deleted=false")
  Page<BlogsEntity> findAllByDeletedFalse(Pageable pageable);
}
