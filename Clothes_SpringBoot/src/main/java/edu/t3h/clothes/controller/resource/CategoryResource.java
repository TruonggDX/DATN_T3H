package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ICategoryService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryResource {
    private final ICategoryService categoryService;

    public CategoryResource(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/list")
    public ResponseEntity<BaseResponse<Page<CategoryDTO>>> getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

        return ResponseEntity.ok(categoryService.getAll(page, size));
    }

    @PostMapping("/create")
    public BaseResponse<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        BaseResponse<?> response = categoryService.creatCategory(categoryDTO);
        return response;
    }

    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteCategory(@PathVariable Long id) {
        BaseResponse<?> response = categoryService.deleteCategory(id);
        return response;
    }

    @PostMapping("/update/{id}")
    public BaseResponse<?> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        BaseResponse<?> response = categoryService.updateCategory(id, categoryDTO);
        return response;
    }

    @GetMapping("/search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        CategoryDTO categoryDTO = categoryService.findCategoryById(id);
        if (categoryDTO != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, categoryDTO);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }

    @GetMapping("/searchByCondition/{condition}")
    public BaseResponse<Page<CategoryDTO>> searchUsersByCondition(@PathVariable String condition,
                                                                  @RequestParam(name = "page", required = false, defaultValue = "0") int page,
                                                                  @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

        BaseResponse<Page<CategoryDTO>> cateDto = categoryService.searchCategoriesCondition(condition, page, size);
        if (cateDto.getData() != null && !cateDto.getData().isEmpty()) {
            BaseResponse<Page<CategoryDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(cateDto.getData());
            return response;
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }

}
