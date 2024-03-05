package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ColorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
@Repository
public interface ColorRepository extends JpaRepository<ColorEntity, Long> {
    Set<ColorEntity> findByIdIsInAndDeletedIsFalse(List<Long> ids);
}
