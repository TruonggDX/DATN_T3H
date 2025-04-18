package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.ColorDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IColorService;
import edu.t3h.clothes.utils.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/color")
public class ColorResource {

    private final IColorService colorService;

    public ColorResource(IColorService colorService){
        this.colorService = colorService;
    }

    @GetMapping("/list")
    public BaseResponse<List<ColorDTO>> getAllColor(){
        BaseResponse<List<ColorDTO>> response = colorService.getAll();
        return response;
    }

    @PostMapping("/create")
    public BaseResponse<?> createColor(@RequestBody ColorDTO colorDTO ){
        BaseResponse<?>response = colorService.createColor(colorDTO);
        return  response;
    }

    @PostMapping("/delete/{id}")
    public BaseResponse<?> deleteColor(@PathVariable Long id){
        BaseResponse<?> response = colorService.delete(id);
        return response;
    }

    @PostMapping("update/{id}")
    public BaseResponse<?> updateColor(@PathVariable Long id, @RequestBody ColorDTO colorDTO){
        BaseResponse<?> response = colorService.updateColor(id, colorDTO);
        return response;
    }
    @GetMapping("search/{id}")
    public BaseResponse<?> getId(@PathVariable Long id) {
        ColorDTO colorDto = colorService.findColorDTOById(id);
        if (colorDto != null) {
            return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, colorDto);
        } else {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
        }
    }
    @GetMapping("/getColor/{productId}")
    public ResponseEntity<BaseResponse<List<ColorDTO>>> getSizeOfProduct(@PathVariable Long productId) {
        BaseResponse<List<ColorDTO>> response = colorService.getColorOfProduct(productId);
        if (response.getCode()==HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
