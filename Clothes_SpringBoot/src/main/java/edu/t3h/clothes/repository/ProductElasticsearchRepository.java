package edu.t3h.clothes.repository;

import edu.t3h.clothes.model.dto.ProductIndex;
import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ProductElasticsearchRepository extends ElasticsearchRepository<ProductIndex, Long> {

  List<ProductIndex> findByNameContainingIgnoreCase(String name);

}
