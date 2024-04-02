package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.*;
import edu.t3h.clothes.service.IProductService;
import edu.t3h.clothes.utils.Constant;
import org.apache.poi.ss.usermodel.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.LoggerFactory;

@Service
public class ProductImpl implements IProductService {

    private Logger logger = LoggerFactory.getLogger(ProductImpl.class);
    private final ProductRepository productRepository;
    private final CategoryRepository categoryReponsitory;

    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ProducerReposiroty producerReposiroty;

    private final ModelMapper modelMapper;

    public ProductImpl(ProductRepository productRepository, CategoryRepository categoryReponsitory, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.categoryReponsitory = categoryReponsitory;
        this.modelMapper = modelMapper;
    }



    @Override
    public BaseResponse<Page<ProductDTO>> getAll(ProductFilterRequest filterRequest, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductEntity> productEntities = productRepository.findAllByFilter(filterRequest,pageable);

        if (productEntities != null && !productEntities.isEmpty()) {
            List<ProductDTO> productDTOS = productEntities.getContent().stream().map(productEntity -> {
                ProductDTO productDTO = modelMapper.map(productEntity, ProductDTO.class);
                productDTO.setCategory(productEntity.getCategoryEntity().getName());
                productDTO.setProducer(productEntity.getProducerEntity().getName());
                String sizeNames = productEntity.getSizeEntities().stream().map(SizeEntity::getName).collect(Collectors.joining(" ,"));
                List<String> imagesColor = productEntity.getColorEntities().stream().map(ColorEntity::getImage).collect(Collectors.toList());
                productDTO.setSize(sizeNames);
                productDTO.setImagesColor(imagesColor);
                return productDTO;
            }).collect(Collectors.toList());

            Page<ProductDTO> pageData = new PageImpl<>(productDTOS, pageable, productEntities.getTotalElements());
            BaseResponse<Page<ProductDTO>> response = new BaseResponse<>();
            response.setCode(200);
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setData(pageData);
            return response;
        } else {
            BaseResponse<Page<ProductDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setData(new PageImpl<>(Collections.emptyList()));
            return response;
        }
    }




    @Override
    public BaseResponse<?> createProduct(ProductDTO productDTO) {
        logger.info("start create product: {}", productDTO.toString());
        BaseResponse baseResponse = new BaseResponse();
        Optional<CategoryEntity> category = categoryReponsitory.findById(productDTO.getCategoryId());

        if (category.isEmpty()) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("category not exists in system");
            return baseResponse;
        }
        Optional<ProducerEntity> producer = producerReposiroty.findById(productDTO.getProducerIds());

        if (producer.isEmpty()) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("category not exists in system");
            return baseResponse;
        }
        Set<SizeEntity> sizeEntities = sizeRepository.findByIds(productDTO.getSizeIds());

        if (CollectionUtils.isEmpty(sizeEntities)) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("size not exits in system");
            return baseResponse;
        }

        Set<ColorEntity> colorEntities = colorRepository.findByIdIsInAndDeletedIsFalse(productDTO.getColorIds());

        if (CollectionUtils.isEmpty(colorEntities)) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("color not exits in system");
            return baseResponse;
        }

        // Tạo mới ProductEntity và thiết lập liên kết với CategoryEntity và ProducerEntities
        ProductEntity productEntity = modelMapper.map(productDTO, ProductEntity.class);
        productEntity.setCategoryEntity(category.get());
        productEntity.setProducerEntity(producer.get());
        productEntity.setSizeEntities(sizeEntities);
        productEntity.setColorEntities(colorEntities);

        LocalDateTime now = LocalDateTime.now();
        productEntity.setCreatedDate(now);
        productEntity.setDeleted(false);

        productRepository.save(productEntity);

        logger.info("save product success");
        baseResponse.setMessage("save product success");
        baseResponse.setCode(HttpStatus.OK.value());
        baseResponse.setData(productDTO);
        return baseResponse;
    }




    @Override
    public BaseResponse<?> deleteProduct(Long productId) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(productId);
        if (optionalProductEntity.isPresent()) {
            ProductEntity productEntity = optionalProductEntity.get();

            // Xóa các liên kết trong bảng trung gian product_size
            productEntity.getSizeEntities().clear();


            // Xóa các liên kết trong bảng trung gian product_color
            productEntity.getColorEntities().clear();

            // Thay đổi trạng thái deleted của sản phẩm và lưu thay đổi vào database
            productEntity.setDeleted(true);
            productRepository.save(productEntity);


            response.setCode(HttpStatus.OK.value());
            response.setMessage("Product with id " + productId + " marked as deleted, and related links deleted");
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Product with id " + productId + " not found");
        }
        return response;
    }


    @Override
    public ProductDTO findProductById(Long id) {
        Optional<ProductEntity> productEntityOptional = productRepository.findById(id);
        ProductEntity productEntity = null;
        BaseResponse<ProductDTO> response;

        if (productEntityOptional.isEmpty()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ProductDTO.class);
        }

        productEntity = productEntityOptional.get();
        if (productEntity.getDeleted()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ProductDTO.class);
        }

        return modelMapper.map(productEntity, ProductDTO.class);
    }



    @Override
    public BaseResponse<?> updateProduct(Long productId, ProductDTO productDTO) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(productId);
        if (optionalProductEntity.isPresent()) {
            ProductEntity productEntity = optionalProductEntity.get();
            // Cập nhật thông tin sản phẩm
            modelMapper.map(productDTO, productEntity);

            // Cập nhật các thông tin trong các bảng trung gian
            Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(productDTO.getCategoryId());
            if (categoryEntityOptional.isPresent()) {
                productEntity.setCategoryEntity(categoryEntityOptional.get());
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Category not found with id " + productDTO.getCategoryId());
                return response;
            }

            Optional<ProducerEntity> producerEntities = producerReposiroty.findById(productDTO.getProducerIds());

            if (producerEntities.isPresent()) {
                productEntity.setProducerEntity(producerEntities.get());
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Category not found with id " + productDTO.getProducerIds());
                return response;
            }

            Set<SizeEntity> sizeEntities = sizeRepository.findByIds(productDTO.getSizeIds());
            if (!CollectionUtils.isEmpty(sizeEntities)) {
                productEntity.setSizeEntities(sizeEntities);
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Size not found");
                return response;
            }

            Set<ColorEntity> colorEntities = colorRepository.findByIdIsInAndDeletedIsFalse(productDTO.getColorIds());
            if (!CollectionUtils.isEmpty(colorEntities)) {
                productEntity.setColorEntities(colorEntities);
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Color not found");
                return response;
            }

            productRepository.save(productEntity); // Lưu thay đổi vào database

            response.setCode(HttpStatus.OK.value());
            response.setMessage("Update product with id " + productId + " successful");
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Product with id " + productId + " not found");
        }
        return response;
    }


    public Resource export () {
        ClassLoader classLoader = getClass().getClassLoader();

        Map<String, Integer> mapKeyIndexCell = new HashMap<>();
        try (InputStream inputStream = classLoader.getResourceAsStream("template.xlsx")) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Row rowKey = sheet.getRow(1);
            for (int i = 0; i < rowKey.getLastCellNum(); i++) {
                Cell cellKey = rowKey.getCell(i);
                String valueCell = cellKey.getStringCellValue();
                if (valueCell.startsWith("{") && valueCell.endsWith("}")) {
                    mapKeyIndexCell.put(valueCell.substring(1, valueCell.length() - 1), i);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
