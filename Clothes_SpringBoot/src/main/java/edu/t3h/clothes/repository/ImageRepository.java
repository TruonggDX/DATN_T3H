package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.ImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImagesEntity, Long> {

}
