package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.ImageProductEntity;
import edu.t3h.clothes.model.dto.ImageProductDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductImageFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageProductService {
  BaseResponse<ImageProductDTO> findByProductId(ProductImageFilterRequest productImageFilterRequest);


}
