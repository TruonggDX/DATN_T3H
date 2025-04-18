package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.mapper.CategoryMapper;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.CategoryRepository;
import edu.t3h.clothes.service.ICategoryService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.Constant.HTTP_MESSAGE;
import edu.t3h.clothes.utils.GenarateCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryImpl implements ICategoryService {

  private final CategoryRepository categoryReponsitory;
  private final ModelMapper modelMapper;
  private final CategoryMapper categoryMapper;

  @Override
  public BaseResponse<Page<CategoryDTO>> getAll(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<CategoryEntity> pages = categoryReponsitory.listCategory(pageable);
    List<CategoryDTO> categoriesDTO = pages.getContent().stream().map(categoryMapper::toDto)
        .toList();
    BaseResponse<Page<CategoryDTO>> response = new BaseResponse<>();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(new PageImpl<>(categoriesDTO, pageable, pages.getTotalElements()));
    return response;
  }

  @Override
  public BaseResponse<CategoryDTO> creatCategory(CategoryDTO categoryDTO) {
    CategoryEntity categoryEntity = categoryMapper.toEntity(categoryDTO);
    categoryEntity.setDeleted(false);
    categoryEntity.setCode(GenarateCode.generateAccountCode());
    categoryEntity = categoryReponsitory.save(categoryEntity);
    categoryDTO = categoryMapper.toDto(categoryEntity);
    BaseResponse<CategoryDTO> response = new BaseResponse<>();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryDTO);
    return response;
  }

  @Override
  public BaseResponse<CategoryDTO> deleteCategory(Long id) {
    BaseResponse<CategoryDTO> response = new BaseResponse<>();
    Optional<CategoryEntity> check = categoryReponsitory.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(HTTP_MESSAGE.FAILED);
      return response;
    }
    CategoryEntity categoryEntity = check.get();
    categoryEntity.setDeleted(true);
    categoryEntity = categoryReponsitory.save(categoryEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryMapper.toDto(categoryEntity));
    return response;
  }

  @Override
  public BaseResponse<CategoryDTO> findCategoryById(Long id) {
    BaseResponse<CategoryDTO> response = new BaseResponse<>();
    Optional<CategoryEntity> check = categoryReponsitory.findById(id);
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
  public BaseResponse<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDTO) {
    BaseResponse<CategoryDTO> response = new BaseResponse<>();
    Optional<CategoryEntity> check = categoryReponsitory.findById(id);
    if (check.isEmpty()) {
      response.setCode(HttpStatus.NOT_FOUND.value());
      response.setMessage(Constant.HTTP_MESSAGE.FAILED);
      return response;
    }
    CategoryEntity categoryEntity = categoryMapper.toEntity(categoryDTO);
    categoryEntity.setId(id);
    categoryEntity.setDeleted(false);
    categoryEntity = categoryReponsitory.save(categoryEntity);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryMapper.toDto(categoryEntity));
    return response;
  }

  @Override
  public BaseResponse<Page<CategoryDTO>> searchCategoriesCondition(String condition, int page,
      int size) {
    BaseResponse<Page<CategoryDTO>> response = new BaseResponse<>();
    Pageable pageable = PageRequest.of(page, size);
    Page<CategoryEntity> pages = categoryReponsitory.searchCategories(condition, pageable);
    Page<CategoryDTO> categoryDTOS = pages.map(categoryMapper::toDto);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryDTOS);
    return response;
  }

}
