package edu.t3h.clothes.repository;

import edu.t3h.clothes.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryReponsitory extends JpaRepository<CategoryEntity, Long> {
    @Query("SELECT c FROM CategoryEntity c WHERE c.name LIKE %?1%") // thêm c.deleted=false áp dụng cho tất cả các query hoặc các hàm trong repository
    List<CategoryEntity> searchCategory(String keyword);
}
