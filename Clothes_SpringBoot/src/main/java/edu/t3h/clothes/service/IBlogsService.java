package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.BlogsDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IBlogsService {

  ResponsePage<List<BlogsDto>> getAllBlogs(Pageable pageable);

  BaseResponse<BlogsDto> createBlog(BlogsDto blogsDto, MultipartFile file);

  BaseResponse<BlogsDto> updateBlog(Long id, BlogsDto blogsDto, MultipartFile file);

  BaseResponse<BlogsDto> deleteBlog(Long id);

  BaseResponse<BlogsDto> getBlogById(Long id);
}
