package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ColorEntity;
import edu.t3h.clothes.entity.SizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
@Repository
public interface ColorRepository extends JpaRepository<ColorEntity, Long> {

    @Query(value = "SELECT c FROM ColorEntity c WHERE c.deleted = false ")
    List<ColorEntity> listColor();
    Set<ColorEntity> findByIdIsInAndDeletedIsFalse(List<Long> ids);
    @Query(value = "SELECT DISTINCT c FROM ColorEntity c LEFT JOIN ProductColorEntity pc ON pc.colorEntity.id = c.id  WHERE pc.productEntity.id = :productId")
    List<ColorEntity> getColor(@Param("productId") Long productId);
}
