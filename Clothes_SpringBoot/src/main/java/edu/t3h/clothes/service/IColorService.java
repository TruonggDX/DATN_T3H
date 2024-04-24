package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.ColorDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IColorService {
    BaseResponse<List<ColorDTO>> getAll();
    BaseResponse<?> createColor(ColorDTO colorDTO);
    BaseResponse<?> delete(Long id);
    ColorDTO findColorDTOById(Long id);
    BaseResponse<?> updateColor(Long id, ColorDTO colorDTO);
    BaseResponse<List<ColorDTO>> getColorOfProduct(Long productId);
}
