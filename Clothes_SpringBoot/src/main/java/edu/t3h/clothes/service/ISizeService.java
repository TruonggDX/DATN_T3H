package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.SizeEntity;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ISizeService {
    BaseResponse<List<SizeDTO>> getAll();
    BaseResponse<?> creatSize(SizeDTO sizeDTO);
    BaseResponse<?> deleteSize(Long id);
    SizeDTO findSizeDTOById(Long id);
    BaseResponse<?> updateSize(Long id,SizeDTO sizeDTO);

    BaseResponse<List<SizeDTO>> getSizeOfProduct(Long productId);
}
