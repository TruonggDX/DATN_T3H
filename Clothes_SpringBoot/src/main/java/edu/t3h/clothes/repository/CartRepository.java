package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CartEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {

  @Query(value = "SELECT c FROM CartEntity c WHERE c.deleted=false AND c.account.email =:email")
  Page<CartEntity> getCartByEmail(@Param("email") String email, Pageable pageable);
}
