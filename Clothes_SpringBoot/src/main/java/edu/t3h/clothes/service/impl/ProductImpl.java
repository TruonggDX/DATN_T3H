package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.ColorEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.SizeEntity;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.CategoryReponsitory;
import edu.t3h.clothes.repository.ColorRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.repository.SizeRepository;
import edu.t3h.clothes.service.IProductService;
import org.apache.poi.ss.usermodel.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductImpl implements IProductService {

    private Logger logger = LoggerFactory.getLogger(ProductImpl.class);
    private final ProductRepository productRepository;
    private final CategoryReponsitory categoryReponsitory;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;

    private final ModelMapper modelMapper;

    public ProductImpl(ProductRepository productRepository, CategoryReponsitory categoryReponsitory, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.categoryReponsitory = categoryReponsitory;
        this.modelMapper = modelMapper;
    }

    @Override
    public BaseResponse<Page<ProductDTO>> getAll(ProductFilterRequest filterRequest, int page, int size){

//        Pageable pageable = Pageable.of(page, size);
//        Page<ProductEntity> productEntities = productRepository.findAllByFilter(filterRequest, pageable);
//
//        List<ProductDTO> productDTOS= productEntities.getContent().stream().map(productEntity -> {
//            ProductDTO productDTO = modelMapper.map(productEntity, ProductDTO.class);
//            productDTO.setCategory(productDTO.getCategory().getName());
//            String sizeP = productEntity.getSizeEntities().stream().map(SizeEntity::getName).collect(Collectors.joining(","));
//            List<String> imagesColor = productEntity.getColorEntities().stream().map(ColorEntity::getImage).collect(Collectors.toList());
//            productDTO.setSize(sizeP);
//            productDTO.setImagesColor(imagesColor);
//            return productDTO;
//        }).collect(Collectors.toList());
//
//        Page<ProductDTO> pageData = new PageImpl(productDTOS,pageable,productEntities.getTotalElements());
//        BaseResponse<Page<ProductDTO>> response = new BaseResponse<>();
//        response.setCode(200);
//        response.setMessage("success");
//        response.setData(pageData);
//        return response;
        return null;
    }

    @Override
    public BaseResponse<?> createProduct(ProductDTO productDTO) {
        logger.info("start create product: {}", productDTO.toString());
        BaseResponse baseResponse = new BaseResponse();
        Optional<CategoryEntity> category = categoryReponsitory.findById(productDTO.getCategoryId());

        if (category.isEmpty()) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("category not exits in system");
            return baseResponse;
        }

        Set<ColorEntity> colorEntities = colorRepository.findByIdIsInAndDeletedIsFalse(productDTO.getColorIds());
        if (CollectionUtils.isEmpty(colorEntities)) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("color not exits in system");
            return baseResponse;
        }

        Set<SizeEntity> sizeEntities = sizeRepository.findByIds(productDTO.getSizeIds());
        if (CollectionUtils.isEmpty(colorEntities)) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("size not exits in system");
            return baseResponse;
        }
        ProductEntity productEntity = modelMapper.map(productDTO, ProductEntity.class);
        productEntity.setCategoryEntity(category.get());
        productEntity.setColorEntities(colorEntities);
        productEntity.setSizeEntities(sizeEntities);
        LocalDateTime now = LocalDateTime.now();
        productEntity.setCreatedDate(now);
        productEntity.setDeleted(false);

        productRepository.save(productEntity);
        logger.info("save product success");
        baseResponse.setMessage("save product success");
        baseResponse.setCode(HttpStatus.OK.value());
        return baseResponse;
    }

    public Resource export() {
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


