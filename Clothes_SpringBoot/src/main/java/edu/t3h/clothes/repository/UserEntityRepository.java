package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface UserEntityRepository  extends JpaRepository<UserEntity,Long>{
    UserEntity findByUsername(String username);
    @Query("SELECT u FROM UserEntity u WHERE u.deleted = false")
    List<UserEntity> listUser();

    @Query("SELECT COUNT(o.id) " +
            "FROM OrdersEntity o " +
            "WHERE o.user.id = :userId " +
            "AND o.deleted = false")
    Integer countOrdersByUserId(@Param("userId") Long userId);


}
