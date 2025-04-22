package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.CategoryDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.ICategoryService;
import java.util.List;
import java.util.logging.Logger;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class ApiCategory {

  private final ICategoryService categoryService;

  @GetMapping("/list")
  public ResponseEntity<BaseResponse<List<CategoryDto>>> getAll() {
    BaseResponse<List<CategoryDto>> response = categoryService.getAllCategories();
    return ResponseEntity.ok(response);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<CategoryDto>> createCategory(
      @RequestBody CategoryDto categoryDTO) {
    BaseResponse<CategoryDto> response = categoryService.creatCategory(categoryDTO);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<CategoryDto>> deleteCategory(@PathVariable Long id) {
    BaseResponse<CategoryDto> response = categoryService.deleteCategory(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<CategoryDto>> updateCategory(@PathVariable Long id,
      @RequestBody CategoryDto categoryDTO) {
    BaseResponse<CategoryDto> response = categoryService.updateCategory(id, categoryDTO);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/search/{id}")
  public ResponseEntity<BaseResponse<CategoryDto>> getId(@PathVariable Long id) {
    BaseResponse<CategoryDto> categoryDTO = categoryService.findCategoryById(id);
    return ResponseEntity.ok(categoryDTO);
  }

  @GetMapping("/searchByCondition")
  public ResponseEntity<ResponsePage<List<CategoryDto>>> searchUsersByCondition(
      @RequestParam(value = "name") String name,
      Pageable pageable) {
    ResponsePage<List<CategoryDto>> cateDto = categoryService.searchCategoriesCondition(name,
        pageable);
    return ResponseEntity.ok(cateDto);
  }

}
