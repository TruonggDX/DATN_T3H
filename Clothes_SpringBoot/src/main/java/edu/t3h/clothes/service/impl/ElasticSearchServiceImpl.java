package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.mapper.ProductMapper;
import edu.t3h.clothes.model.dto.ProductIndex;
import edu.t3h.clothes.repository.ProductElasticsearchRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.service.IElasticSearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ElasticSearchServiceImpl implements IElasticSearchService {

  private final ProductRepository productRepository;
  private final ProductElasticsearchRepository courseESRepo;
  private final ProductMapper productMapper;

  @Override
  public void indexAll() {
    List<ProductEntity> courses = productRepository.getAllDeletedProduct();
    List<ProductIndex> indexList = courses.stream().map(productMapper::toIndex).toList();
    courseESRepo.saveAll(indexList);
  }
}
