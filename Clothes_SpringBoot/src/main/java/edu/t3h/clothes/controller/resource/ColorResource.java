package edu.t3h.clothes.controller.resource;

import edu.t3h.clothes.model.dto.ColorDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.service.IColorService;
import org.springframework.web.bind.annotation.*;

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
    public BaseResponse<?> createColor(@RequestBody ColorDTO colorDTO){
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

}
