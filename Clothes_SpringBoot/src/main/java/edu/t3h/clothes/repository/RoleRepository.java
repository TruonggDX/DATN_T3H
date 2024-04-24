package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.entity.SizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository

public interface RoleRepository  extends JpaRepository<RoleEntity,Long>{
    @Query(value = "select r from RoleEntity r join r.users u where u.username=:username")
    List<RoleEntity> getRoleByUsername(@Param("username") String username);
    @Query("SELECT r FROM RoleEntity r WHERE r.name = :name")
    RoleEntity findByName(@Param("name") String name);
    @Query("SELECT r FROM RoleEntity r WHERE r.deleted = false ")
    List<RoleEntity> listRole();


    @Query(value = "SELECT s FROM RoleEntity s WHERE s.id IN  :ids AND s.deleted= false ")
    Set<RoleEntity> findByIds(List<Long> ids);
}
