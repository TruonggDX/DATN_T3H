package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.BlogsEntity;
import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.exception.HandleUploadFileException;
import edu.t3h.clothes.mapper.BlogsMapper;
import edu.t3h.clothes.mapper.ImageMapper;
import edu.t3h.clothes.model.dto.BlogsDto;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.AccountRepository;
import edu.t3h.clothes.repository.BlogsRepository;
import edu.t3h.clothes.repository.CategoryRepository;
import edu.t3h.clothes.repository.ImageRepository;
import edu.t3h.clothes.security.service.JwtService;
import edu.t3h.clothes.service.IBlogsService;
import edu.t3h.clothes.service.IUploadService;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class BlogsServiceImpl implements IBlogsService {

  private final BlogsRepository blogsRepository;
  private final BlogsMapper blogsMapper;
  private final IUploadService uploadService;
  private final CategoryRepository categoryRepository;
  private final ImageRepository imageRepository;
  private final JwtService jwtService;
  private final AccountRepository accountRepository;
  private final ImageMapper imageMapper;

  @Override
  public ResponsePage<List<BlogsDto>> getAllBlogs(Pageable pageable) {
    ResponsePage<List<BlogsDto>> responsePage = new ResponsePage<>();
    Page<BlogsEntity> page = blogsRepository.findAllByDeletedFalse(pageable);
    List<BlogsDto> blogsDtos = page.getContent().stream().map(blogsEntity -> {
      BlogsDto blogsDto = blogsMapper.toDto(blogsEntity);
      ImagesEntity images = imageRepository.findByBlogId(blogsDto.getId());
      if (images != null) {
        blogsDto.setImageUrl(images.getUrl());
      }
      return blogsDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(blogsDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<BlogsDto> createBlog(BlogsDto blogsDto, MultipartFile file) {
    BaseResponse<BlogsDto> response = new BaseResponse<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<CategoryEntity> checkCate = categoryRepository.findById(blogsDto.getCategoryId());
    if (checkCate.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Not found categoryId : " + blogsDto.getCategoryId());
      return response;
    }
    Optional<AccountEntity> checkAcc = accountRepository.findByEmail(email);
    if (checkAcc.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Not found email account : " + email);
      return response;
    }
    BlogsEntity blogsEntity = blogsMapper.toEntity(blogsDto);
    blogsEntity.setCode(GenarateCode.generateAccountCode());
    blogsEntity.setDeleted(false);
    blogsEntity.setCategoryEntity(checkCate.get());
    blogsEntity.setAccount(checkAcc.get());
    blogsRepository.save(blogsEntity);
    if (file == null || file.isEmpty()) {
      throw new HandleUploadFileException("File is null or empty");
    }
    ImageDto imageDto = null;
    try {
      imageDto = uploadService.uploadImage(file);
      ImagesEntity iEntity = imageMapper.toEntity(imageDto);
      iEntity.setBlogsEntity(blogsEntity);
      imageRepository.save(iEntity);
    } catch (IOException e) {
      throw new HandleUploadFileException("Upload image error");
    }
    blogsDto = blogsMapper.toDto(blogsEntity);
    ImagesEntity images = imageRepository.findByBlogId(blogsDto.getId());
    if (images != null) {
      blogsDto.setImageUrl(images.getUrl());
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(blogsDto);
    return response;
  }

  @Override
  public BaseResponse<BlogsDto> updateBlog(Long id, BlogsDto blogsDto, MultipartFile file) {
    BaseResponse<BlogsDto> response = new BaseResponse<>();
    Optional<BlogsEntity> blogsEntity = blogsRepository.findById(id);
    if (blogsEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.BLOGS_NOT_FOUND + id);
      return response;
    }
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    Optional<CategoryEntity> checkCate = categoryRepository.findById(blogsDto.getCategoryId());
    if (checkCate.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Not found categoryId : " + blogsDto.getCategoryId());
      return response;
    }
    Optional<AccountEntity> checkAcc = accountRepository.findByEmail(email);
    if (checkAcc.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage("Not found email account : " + email);
      return response;
    }
    BlogsEntity blogs = blogsMapper.toEntity(blogsDto);
    blogs.setDeleted(false);
    blogs.setCategoryEntity(checkCate.get());
    blogs.setAccount(checkAcc.get());
    blogsRepository.save(blogs);
    ImagesEntity images = imageRepository.findByBlogId(id);
    if (file != null && !file.isEmpty()) {
      if (images != null) {
        uploadService.deleteImage(images.getPublicId());
      } else {
        images = new ImagesEntity();
        images.setBlogsEntity(blogs);
      }
      ImageDto imageDTO = null;
      try {
        imageDTO = uploadService.uploadImage(file);
      } catch (IOException e) {
        throw new HandleUploadFileException("Upload image error");
      }
      images.setUrl(imageDTO.getUrl());
      images.setType(file.getContentType());
      images.setPublicId(imageDTO.getPublicId());
      imageRepository.save(images);
    }
    blogsDto = blogsMapper.toDto(blogs);
    if (images != null) {
      blogsDto.setImageUrl(images.getUrl());
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(blogsDto);
    return response;
  }

  @Override
  public BaseResponse<BlogsDto> deleteBlog(Long id) {
    BaseResponse<BlogsDto> response = new BaseResponse<>();
    Optional<BlogsEntity> blogsEntity = blogsRepository.findById(id);
    if (blogsEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.BLOGS_NOT_FOUND + id);
      return response;
    }
    BlogsEntity blogs = blogsEntity.get();
    blogs.setDeleted(true);
    blogsRepository.save(blogs);
    BlogsDto blogsDto = blogsMapper.toDto(blogs);
    ImagesEntity images = imageRepository.findByBlogId(blogsDto.getId());
    if (images != null) {
      blogsDto.setImageUrl(images.getUrl());
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(blogsDto);
    return response;
  }

  @Override
  public BaseResponse<BlogsDto> getBlogById(Long id) {
    BaseResponse<BlogsDto> response = new BaseResponse<>();
    Optional<BlogsEntity> blogsEntity = blogsRepository.findById(id);
    if (blogsEntity.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.BLOGS_NOT_FOUND + id);
      return response;
    }
    BlogsDto blogsDto = blogsMapper.toDto(blogsEntity.get());
    ImagesEntity images = imageRepository.findByBlogId(blogsDto.getId());
    if (images != null) {
      blogsDto.setImageUrl(images.getUrl());
    }
    response.setCode(HttpStatus.OK.value());
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setData(blogsDto);
    return response;
  }
}
