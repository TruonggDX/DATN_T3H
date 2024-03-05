package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.SizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SizeRepository extends JpaRepository<SizeEntity, Long>{

    @Query(value = "SELECT s FROM SizeEntity s WHERE s.id IN  :ids AND s.deleted= 0")
    Set<SizeEntity> findByIds(List<Long> ids);
}
