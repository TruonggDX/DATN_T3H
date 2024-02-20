package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface RoleRepository  extends JpaRepository<RoleEntity,Long>{
}
