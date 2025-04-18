package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUsername(String username);

    @Query("SELECT u FROM UserEntity u WHERE u.deleted = false")
    Page<UserEntity> listUser(Pageable pageable);

    @Query("SELECT u FROM UserEntity u WHERE (u.name LIKE %:condition% OR u.code LIKE %:condition%) AND u.deleted = false")
    Page<UserEntity> searchUsers(@Param("condition") String condition, Pageable pageable);


    @Query("SELECT COUNT(o.id) " +
            "FROM OrdersEntity o " +
            "WHERE o.user.id = :userId " +
            "AND o.deleted = false")
    Integer countOrdersByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT COUNT(*) FROM UserEntity WHERE deleted=false ")
    Integer countUserInSystem();
}
