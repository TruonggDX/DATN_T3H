package edu.t3h.clothes.Repository;

import edu.t3h.clothes.Entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface RoleRepository  extends JpaRepository<RoleEntity,Long>{
}
