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


//  @Override
//  public BaseResponse<List<CategoryDto>> getAllCategories() {
//    BaseResponse<List<CategoryDto>> response = new BaseResponse<>();
//    List<CategoryEntity> list = categoryRepository.findAllCategories();
//    List<CategoryDto> categoryDtos = list.stream().map(categoryEntity -> {
//      CategoryDto categoryDto = categoryMapper.toDto(categoryEntity);
//      List<CategoryEntity> categoryEntities = categoryRepository.findByParentCode(
//          categoryDto.getCode());
//      List<CategoryDto> categoryDtoList = categoryEntities.stream().map(categoryMapper::toDto)
//          .toList();
//      categoryDto.setChildren(categoryDtoList);
//      return categoryDto;
//    }).toList();
//    response.setData(categoryDtos);
//    response.setMessage(HTTP_MESSAGE.SUCCESS);
//    response.setCode(HttpStatus.OK.value());
//    return response;
//  }

  @Override
  public ResponsePage<List<CategoryDto>> getAllCategoriesByParentId(Pageable pageable) {
    ResponsePage<List<CategoryDto>> responsePage = new ResponsePage<>();
    Page<CategoryEntity> page = categoryRepository.findAllCategories(pageable);
    List<CategoryDto> categoryDtos = page.stream().map(categoryMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(categoryDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<CategoryDto> creatCategory(CategoryDto categoryDTO) {
    BaseResponse<CategoryDto> response = new BaseResponse<>();
    CategoryEntity categoryEntity = categoryMapper.toEntity(categoryDTO);
    categoryEntity.setDeleted(false);
    categoryEntity.setCode(GenarateCode.generateAccountCode());
    if (categoryDTO.getParentId() != null) {
      CategoryEntity parent = categoryRepository.findById(categoryDTO.getParentId()).orElse(null);
      if (parent != null) {
        categoryEntity.setParent(parent);
      }
    }
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
  public ResponsePage<List<CategoryDto>> searchCategoriesCondition(String name, Pageable pageable) {
    ResponsePage<List<CategoryDto>> responsePage = new ResponsePage<>();
    Page<CategoryEntity> page = categoryRepository.searchCategories(name, pageable);
    List<CategoryDto> categoryDtos = page.stream().map(categoryEntity -> {
      CategoryDto categoryDto = categoryMapper.toDto(categoryEntity);
      List<CategoryEntity> categoryEntities = categoryRepository.findByParentCode(
          categoryDto.getCode());
      List<CategoryDto> categoryDtoList = categoryEntities.stream().map(categoryMapper::toDto)
          .toList();
      categoryDto.setChildren(categoryDtoList);
      return categoryDto;
    }).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(categoryDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<List<CategoryDto>> loadCategoriesByParentId(Long parentId) {
    BaseResponse<List<CategoryDto>> response = new BaseResponse<>();
    List<CategoryEntity> list = categoryRepository.findAllCategoriesByParentId(parentId);
    List<CategoryDto> categoryDtos = list.stream().map(categoryMapper::toDto).toList();
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setData(categoryDtos);
    return response;
  }

}
