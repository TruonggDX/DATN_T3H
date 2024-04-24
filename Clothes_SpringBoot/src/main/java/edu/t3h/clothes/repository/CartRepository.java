package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CartEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.request.CartFilterRequest;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    @Query("SELECT c FROM CartEntity c WHERE c.user.id = :userId AND c.deleted=false ")
    Page<CartEntity> getProductOfUserInCart(@Param("userId") Long userId, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM CartEntity c WHERE c.deleted=false AND c.user.id =:uid")
    Long countProductOfUser(@Param("uid") Long uid);

    @Query(value = "SELECT SUM (c.number * c.price) FROM CartEntity c WHERE c.deleted = false ")
    Double getTotalPriceOfAllCartItems();
}
