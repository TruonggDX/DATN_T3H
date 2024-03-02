package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.CategoryReponsitory;
import edu.t3h.clothes.service.ICategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryImpl implements ICategoryService {

    private CategoryReponsitory categoryReponsitory;

    private final ModelMapper modelMapper;
    public CategoryImpl(CategoryReponsitory categoryReponsitory, ModelMapper modelMapper){
        this.categoryReponsitory =categoryReponsitory;
        this.modelMapper = modelMapper;
    }
    @Override
    public BaseResponse<List<CategoryDTO>> getAll() {
        List<CategoryEntity> categoryEntities = categoryReponsitory.findAll();

        List<CategoryDTO> categoryDTOs = categoryEntities.stream()
                .map(categoryEntity -> modelMapper.map(categoryEntity, CategoryDTO.class))
                .collect(Collectors.toList());
        BaseResponse<List<CategoryDTO>> response = new BaseResponse<>();
        response.setCode(200);
        response.setMessage("success");
        response.setData(categoryDTOs);
        return response;
    }

    @Override
    public BaseResponse<?> creatCategory(CategoryDTO categoryDTO) {
        CategoryEntity categoryEntity = modelMapper.map(categoryDTO, CategoryEntity.class);
        categoryReponsitory.save(categoryEntity);
        BaseResponse<CategoryDTO> response = new BaseResponse<>();
        response.setCode(200);
        response.setMessage("succes !");
        response.setData(modelMapper.map(categoryEntity, CategoryDTO.class));
        return response;
    }

    @Override
    public BaseResponse<?> deleteCategory(Long id) {
        Optional<CategoryEntity> categoryEntity = categoryReponsitory.findById(id);
        BaseResponse<List<CategoryDTO>> baseResponse;
        if (categoryEntity.isPresent()){
            categoryReponsitory.delete(categoryEntity.get());
            List<CategoryEntity> categoryEntities = categoryReponsitory.findAll();
            List<CategoryDTO> categoryDTOs = categoryEntities.stream()
                    .map(category -> modelMapper.map(category, CategoryDTO.class))
                    .collect(Collectors.toList());
            baseResponse= new BaseResponse<>(200,"delete succesfull !",categoryDTOs);
        }else {
            baseResponse= new BaseResponse<>(404,"delete failed !",null);
        }
        return baseResponse;
    }

    @Override
    public CategoryDTO findCategoryById(Long id) {
        Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(id);

        if (categoryEntityOptional.isPresent()) {
            CategoryEntity categoryEntity = categoryEntityOptional.get();
            return modelMapper.map(categoryEntity, CategoryDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public BaseResponse<?> updateCategory(Long categoryId, CategoryDTO categoryDTO) {
        Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(categoryId);

        if (categoryEntityOptional.isPresent()) {
            CategoryEntity updateCategory = categoryEntityOptional.get();
            updateCategory.setName(categoryDTO.getName());
            updateCategory.setCode(categoryDTO.getCode());

            categoryReponsitory.save(updateCategory);

            CategoryDTO updatedCategoryDTO = modelMapper.map(updateCategory, CategoryDTO.class);

            return new BaseResponse<>(200, "Update successful", updatedCategoryDTO);
        } else {
            return new BaseResponse<>(404, "Update failed ", null);
        }
    }


//    @Override
//    public Boolean creatCategory(CategoryEntity category) {
//        try {
//           this.categoryReponsitory.save(category);
//           return true;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }

//    @Override
//    public CategoryEntity findCategoryById(Long id) {
//        return this.categoryReponsitory.findById(id).get();
//    }

//    @Override
//    public Boolean updateCategory(CategoryEntity category) {
//        try {
//            this.categoryReponsitory.save(category);
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }

//    @Override
//    public Boolean deleteCategory(Integer id) {
//        try{
//            this.categoryReponsitory.delete(findCategoryById(id));
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    @Override
//    public List<CategoryEntity> searchCategory(String keyword) {
//        return this.categoryReponsitory.searchCategory(keyword);
//    }
//
//    @Override
//    public Page<CategoryEntity> getAll(Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo-1,5);
//        return this.categoryReponsitory.findAll(pageable);
//    }
}
