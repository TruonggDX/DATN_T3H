package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.AccountEntity;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

  Optional<AccountEntity> findByEmail(String email);

  @Query(value = "SELECT a FROM AccountEntity a WHERE a.deleted=false")
  Page<AccountEntity> getAllAccounts(Pageable pageable);

  @Query(value = "SELECT a FROM AccountEntity a JOIN a.roles r WHERE a.deleted=false "
      + "AND (:code IS NULL OR a.code LIKE CONCAT('%', :code, '%')) "
      + "AND (:email IS NULL OR a.email LIKE CONCAT('%', :email, '%')) "
      + "AND (:roleCode IS NULL OR r.code LIKE CONCAT('%', :roleCode, '%')) ")
  Page<AccountEntity> findByCondition(String code, String email, String roleCode,
      Pageable pageable);

}
