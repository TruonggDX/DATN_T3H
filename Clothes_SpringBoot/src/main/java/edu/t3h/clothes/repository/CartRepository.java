package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VariantEntity;
import java.util.Optional;
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

  @Query("SELECT c FROM CartEntity c " +
      "WHERE c.account = :account " +
      "AND c.product = :product " +
      "AND c.variant = :variant " +
      "AND c.deleted = false")
  Optional<CartEntity> findExistingCart(
      @Param("account") AccountEntity account,
      @Param("product") ProductEntity product,
      @Param("variant") VariantEntity variant
  );

  @Query("select c from CartEntity c where c.account.email =:email and c.id =:cartId and c.account.deleted = false ")
  Optional<CartEntity> findByEmailAndCartId(String email,Long cartId);
}
