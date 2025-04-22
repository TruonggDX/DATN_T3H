package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.RoleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

  @Query("SELECT r FROM RoleEntity r WHERE r.deleted = false ")
  Page<RoleEntity> listRole(Pageable pageable);

  @Query("SELECT r FROM RoleEntity r " +
      "WHERE (:name IS NULL OR r.name LIKE CONCAT('%', :name, '%')) " +
      "AND (:code IS NULL OR r.code LIKE CONCAT('%', :code, '%')) " +
      "AND r.deleted = false")
  Page<RoleEntity> searchRoles(@Param("code") String code, @Param("name") String name,
      Pageable pageable);
}