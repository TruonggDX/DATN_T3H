package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.ProducerDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.CategoryRepository;
import edu.t3h.clothes.service.ICategoryService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryImpl implements ICategoryService {

    private CategoryRepository categoryReponsitory;
    private Logger logger = LoggerFactory.getLogger(CategoryImpl.class);

    private final ModelMapper modelMapper;
    public CategoryImpl(CategoryRepository categoryReponsitory, ModelMapper modelMapper){
        this.categoryReponsitory =categoryReponsitory;
        this.modelMapper = modelMapper;
    }
    @Override
    public BaseResponse<Page<CategoryDTO>> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryEntity> pages = categoryReponsitory.listCategory(pageable);

        List<CategoryDTO> categoriesDTO = pages.getContent().stream()
                .map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDTO.class))
                .collect(Collectors.toList());

        BaseResponse<Page<CategoryDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(new PageImpl<>(categoriesDTO, pageable, pages.getTotalElements()));

        logger.info("Return size {}", categoriesDTO.size());
        logger.info("Finishing......");
        return response;
    }
    @Override
    public BaseResponse<?> creatCategory(CategoryDTO categoryDTO) {
        CategoryEntity categoryEntity = modelMapper.map(categoryDTO, CategoryEntity.class);
        categoryEntity.setDeleted(false);
        categoryEntity.setCreatedDate(LocalDateTime.now());

        categoryEntity = categoryReponsitory.save(categoryEntity);
        categoryDTO.setId(categoryEntity.getId());
        BaseResponse<CategoryDTO> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(categoryDTO);
        return response;
    }
    @Override
    public BaseResponse<?> deleteCategory(Long id) {
        Optional<CategoryEntity> categoryEntity = categoryReponsitory.findById(id);
        BaseResponse<List<CategoryDTO>> baseResponse;
        if (categoryEntity.isEmpty()){
            baseResponse= new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
            return baseResponse;
        }
        CategoryEntity categorys = categoryEntity.get();
        categorys.setDeleted(true);
        categoryReponsitory.save(categorys);
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,null);
    }
    @Override
    public CategoryDTO findCategoryById(Long id) {
        Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(id);
        CategoryEntity categoryEntity = null;
        BaseResponse<CategoryDTO> response;
        if (categoryEntityOptional.isEmpty()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, CategoryDTO.class);
        }
        categoryEntity = categoryEntityOptional.get();
        if (categoryEntity.getDeleted()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, CategoryDTO.class);
        }
        return modelMapper.map(categoryEntity, CategoryDTO.class);
    }

    @Override
    public BaseResponse<?> updateCategory(Long id, CategoryDTO categoryDTO) {
        Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(id);
        if (categoryEntityOptional.isEmpty()) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
        CategoryEntity categorys = categoryEntityOptional.get();
        categorys.setName(categoryDTO.getName());
        categorys.setCode(categoryDTO.getCode());

        categoryReponsitory.save(categorys);
        CategoryDTO categoryDTOs = modelMapper.map(categorys,CategoryDTO.class);
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, categoryDTOs);
    }

    @Override
    public BaseResponse<Page<CategoryDTO>> searchCategoriesCondition(String condition, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryEntity> pages = categoryReponsitory.searchCategories(condition, pageable);
        Page<CategoryDTO> categoryDTOS = pages.map(userEntity -> {
            CategoryDTO userDTO = modelMapper.map(userEntity, CategoryDTO.class);
            return userDTO;
        });
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, categoryDTOS);
    }

}
