package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

  @Query("SELECT r FROM RoleEntity r WHERE r.deleted = false ")
  List<RoleEntity> listRole();
}