package edu.t3h.clothes.controller;

import edu.t3h.clothes.service.IElasticSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/elastic-search")
@RequiredArgsConstructor
public class ApiElasticSearch {

  private final IElasticSearchService elasticSearchService;

  @PostMapping("/sync")
  public ResponseEntity<String> syncProductsToElasticsearch() {
    elasticSearchService.indexAll();
    return ResponseEntity.ok("Đã đồng bộ product vào Elasticsearch");
  }
}
