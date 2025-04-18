package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
public class CategoryResource {

  private final ICategoryService categoryService;

  @GetMapping("/list")
  public ResponseEntity<BaseResponse<Page<CategoryDTO>>> getAll(
      @RequestParam(name = "page", required = false, defaultValue = "0") int page,
      @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
    return ResponseEntity.ok(categoryService.getAll(page, size));
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<CategoryDTO>> createCategory(
      @RequestBody CategoryDTO categoryDTO) {
    BaseResponse<CategoryDTO> response = categoryService.creatCategory(categoryDTO);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<CategoryDTO>> deleteCategory(@PathVariable Long id) {
    BaseResponse<CategoryDTO> response = categoryService.deleteCategory(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<CategoryDTO>> updateCategory(@PathVariable Long id,
      @RequestBody CategoryDTO categoryDTO) {
    BaseResponse<CategoryDTO> response = categoryService.updateCategory(id, categoryDTO);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/search/{id}")
  public ResponseEntity<BaseResponse<CategoryDTO>> getId(@PathVariable Long id) {
    BaseResponse<CategoryDTO> categoryDTO = categoryService.findCategoryById(id);
    return ResponseEntity.ok(categoryDTO);
  }

  @GetMapping("/searchByCondition/{condition}")
  public ResponseEntity<BaseResponse<Page<CategoryDTO>>> searchUsersByCondition(
      @PathVariable String condition,
      @RequestParam(name = "page", required = false, defaultValue = "0") int page,
      @RequestParam(name = "size", required = false, defaultValue = "10") int size) {
    BaseResponse<Page<CategoryDTO>> cateDto = categoryService.searchCategoriesCondition(condition,
        page, size);
    return ResponseEntity.ok(cateDto);
  }

}
