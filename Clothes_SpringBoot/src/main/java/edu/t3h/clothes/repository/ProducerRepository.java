package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ProducerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerRepository extends JpaRepository<ProducerEntity, Long> {

  @Query("SELECT p FROM ProducerEntity p WHERE p.deleted = false")
  Page<ProducerEntity> listProducer(Pageable pageable);

  @Query("SELECT p FROM ProducerEntity p " +
      "WHERE (:name IS NULL OR p.name LIKE CONCAT('%', :name, '%')) " +
      "AND (:code IS NULL OR p.code LIKE CONCAT('%', :code, '%')) " +
      "AND (:address IS NULL OR p.address LIKE CONCAT('%', :address, '%')) " +
      "AND (:phone IS NULL OR p.phone LIKE CONCAT('%', :phone, '%')) " +
      "AND p.deleted = false")
  Page<ProducerEntity> searchProducer(@Param("name") String name, @Param("code") String code,
      @Param("address") String address, @Param("phone") String phone, Pageable pageable);

}