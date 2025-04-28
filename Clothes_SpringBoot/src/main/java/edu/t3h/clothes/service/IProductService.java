package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.ProductDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IProductService {

  ResponsePage<List<ProductDto>> getAllProducts(Pageable pageable);

  BaseResponse<ProductDto> createProduct(ProductDto productDto, List<MultipartFile> file);

  BaseResponse<ProductDto> updateProduct(Long id, ProductDto productDto, MultipartFile file);

  BaseResponse<ProductDto> deleteProduct(Long id);

  BaseResponse<ProductDto> getProductById(Long id);
}

