package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;

public interface IProductService {

    BaseResponse<Page<ProductDTO>> getAll(ProductFilterRequest filterRequest, int page, int size);

    BaseResponse<?> createProduct(ProductDTO productDTO);

    BaseResponse<?> deleteProduct(Long productId);

    BaseResponse<?> updateProduct(Long productId, ProductDTO productDTO);
}

