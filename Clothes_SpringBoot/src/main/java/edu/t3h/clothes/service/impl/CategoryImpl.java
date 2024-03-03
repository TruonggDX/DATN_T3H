package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.CategoryReponsitory;
import edu.t3h.clothes.service.ICategoryService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryImpl implements ICategoryService {

    private CategoryReponsitory categoryReponsitory;
    private Logger logger = LoggerFactory.getLogger(CategoryImpl.class);

    private final ModelMapper modelMapper;
    public CategoryImpl(CategoryReponsitory categoryReponsitory, ModelMapper modelMapper){
        this.categoryReponsitory =categoryReponsitory;
        this.modelMapper = modelMapper;
    }
    @Override
    public BaseResponse<List<CategoryDTO>> getAll() {
        List<CategoryEntity> categoryEntities = categoryReponsitory.listCategory();
        logger.info("Data  {} ", categoryEntities.size());

        List<CategoryDTO> categoryDTOs = categoryEntities.stream()
                .map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDTO.class))
                .collect(Collectors.toList());

        BaseResponse<List<CategoryDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(categoryDTOs);

        logger.info("Return size  {}", categoryDTOs.size());
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

        List<CategoryEntity> categoryEntities = categoryReponsitory.listCategory();
        List<CategoryDTO> categoryDTOs = categoryEntities.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
        baseResponse= new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS,categoryDTOs);

        return baseResponse;
    }
    @Override
    public CategoryDTO findCategoryById(Long id) {
        Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(id);
        BaseResponse<List<CategoryDTO>> response;
        if (categoryEntityOptional.isEmpty()) {
            response = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, CategoryDTO.class);
        }
        CategoryEntity categoryEntity = categoryEntityOptional.get();
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
}
