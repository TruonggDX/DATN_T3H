package edu.t3h.clothes.Repository;

import edu.t3h.clothes.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserEntityRepository  extends JpaRepository<UserEntity,Long>{
//    UserEntity findbyUsername(String username);
    UserEntity findByUsername(String username);
}
