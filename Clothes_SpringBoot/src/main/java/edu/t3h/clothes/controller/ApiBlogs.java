package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.BlogsDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IBlogsService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class ApiBlogs {

  private final IBlogsService iBlogsService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<BlogsDto>>> getAllBlogs(Pageable pageable) {
    ResponsePage<List<BlogsDto>> respPage = iBlogsService.getAllBlogs(pageable);
    return ResponseEntity.ok(respPage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<BlogsDto>> createBlog(@ModelAttribute BlogsDto blogsDto,
      @RequestParam(value = "file", required = false) MultipartFile file) {
    BaseResponse<BlogsDto> response = iBlogsService.createBlog(blogsDto, file);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<BlogsDto>> getBlogById(@PathVariable Long id) {
    BaseResponse<BlogsDto> dto = iBlogsService.getBlogById(id);
    return ResponseEntity.ok(dto);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<BlogsDto>> updateBlog(@PathVariable Long id,
      @ModelAttribute BlogsDto blogsDto,
      @RequestParam(value = "file", required = false) MultipartFile file) {
    BaseResponse<BlogsDto> updated = iBlogsService.updateBlog(id, blogsDto, file);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<BlogsDto>> deleteBlog(@PathVariable Long id) {
    BaseResponse<BlogsDto> response = iBlogsService.deleteBlog(id);
    return ResponseEntity.ok(response);
  }
}
