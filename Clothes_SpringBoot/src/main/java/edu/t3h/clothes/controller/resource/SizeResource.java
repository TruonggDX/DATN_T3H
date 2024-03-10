package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.ISizeService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/size")
public class SizeResource {
    private final ISizeService sizeService;

    public SizeResource(ISizeService sizeService) {
        this.sizeService = sizeService;
    }

    @GetMapping("/list")
    public BaseResponse<List<SizeDTO>> getAllSize() {
        BaseResponse<List<SizeDTO>> response = sizeService.getAll();
        return response;
    }

    @PostMapping("/create")
    public BaseResponse<?> createSize(@RequestBody SizeDTO sizeDTO) {
        BaseResponse<?> response = sizeService.creatSize(sizeDTO);
        return response;
    }

    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteSize(@PathVariable Long id) {
        BaseResponse<?> response = sizeService.deleteSize(id);
        return response;
    }

    @PostMapping("update/{id}")
    public BaseResponse<?> updateSize(@PathVariable Long id, @RequestBody SizeDTO sizeDTO) {
        BaseResponse<?> response = sizeService.updateSize(id, sizeDTO);
        return response;
    }

    @GetMapping("search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        SizeDTO sizeDto = sizeService.findSizeDTOById(id);
        if (sizeDto != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, sizeDto);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }
}
