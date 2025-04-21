package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.mapper.CategoryMapper;
import edu.t3h.clothes.model.dto.CategoryDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.repository.CategoryRepository;
import edu.t3h.clothes.service.ICategoryService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryImpl implements ICategoryService {

  private final CategoryRepository categoryRepository;
  private final CategoryMapper categoryMapper;

  @Override
  public ResponsePage<List<CategoryDto>> getAll(Pageable pageable) {
    ResponsePage<List<CategoryDto>> responsePage = new ResponsePage<>();
    Page<CategoryEntity> page = categoryRepository.listCategory(pageable);
    List<CategoryDto> categoriesDTO = page.getContent().stream().map(categoryMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(categoriesDTO);
    return responsePage;
  }

  @Override
  public BaseResponse<CategoryDto> creatCategory(CategoryDto categoryDTO) {
    BaseResponse<CategoryDto> response = new BaseResponse<>();
    CategoryEntity categoryEntity = categoryMapper.toEntity(categoryDTO);
    categoryEntity.setDeleted(false);
    categoryEntity.setCode(GenarateCode.generateAccountCode());
    categoryEntity = categoryRepository.save(categoryEntity);
    categoryDTO = categoryMapper.toDto(categoryEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryDTO);
    return response;
  }

  @Override
  public BaseResponse<CategoryDto> deleteCategory(Long id) {
    BaseResponse<CategoryDto> response = new BaseResponse<>();
    Optional<CategoryEntity> check = categoryRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    CategoryEntity categoryEntity = check.get();
    categoryEntity.setDeleted(true);
    categoryEntity = categoryRepository.save(categoryEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryMapper.toDto(categoryEntity));
    return response;
  }

  @Override
  public BaseResponse<CategoryDto> findCategoryById(Long id) {
    BaseResponse<CategoryDto> response = new BaseResponse<>();
    Optional<CategoryEntity> check = categoryRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.FAILED);
      return response;
    }
    CategoryEntity categorys = check.get();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryMapper.toDto(categorys));
    return response;
  }

  @Override
  public BaseResponse<CategoryDto> updateCategory(Long id, CategoryDto categoryDTO) {
    BaseResponse<CategoryDto> response = new BaseResponse<>();
    Optional<CategoryEntity> check = categoryRepository.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.FAILED);
      return response;
    }
    CategoryEntity categoryEntity = categoryMapper.toEntity(categoryDTO);
    categoryEntity.setId(id);
    categoryEntity.setDeleted(false);
    categoryEntity = categoryRepository.save(categoryEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryMapper.toDto(categoryEntity));
    return response;
  }

  @Override
  public ResponsePage<List<CategoryDto>> searchCategoriesCondition(String code, String name,
      Pageable pageable) {
    ResponsePage<List<CategoryDto>> responsePage = new ResponsePage<>();
    Page<CategoryEntity> page = categoryRepository.searchCategories(code,name, pageable);
    List<CategoryDto> categoryDTOS = page.getContent().stream().map(categoryMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(categoryDTOS);
    return responsePage;
  }

}
