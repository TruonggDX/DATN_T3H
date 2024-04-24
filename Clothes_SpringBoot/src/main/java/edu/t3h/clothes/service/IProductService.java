package edu.t3h.clothes.service;

import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.ProductSizeEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.OrdersDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductService {

    BaseResponse<Page<ProductDTO>> getAll(ProductFilterRequest filterRequest, int page, int size);

    BaseResponse<?> createProduct(ProductDTO productDTO);

    BaseResponse<?> deleteProduct(Long productId);
    ProductDTO findProductById(Long id);
    BaseResponse<?> updateProduct(Long productId, ProductDTO productDTO);


    BaseResponse<List<ProductDTO>> findProductsByCategoryId(Long categoryId);
    BaseResponse<List<ProductDTO>> findProductsByName(String name);

    BaseResponse<Page<ProductDTO>> searchproductCondition(String condition, int page, int size);


    BaseResponse<List<ProductDTO>> getProductBestSellers();

    BaseResponse<List<ProductDTO>> findProductsInPriceRange(double minPrice, double maxPrice);

    BaseResponse<List<ProductDTO>> findAllProductNew();
    BaseResponse<Long> countProuct();




}

