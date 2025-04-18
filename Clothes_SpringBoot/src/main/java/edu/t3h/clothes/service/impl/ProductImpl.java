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
    private final ProducerRepository producerReposiroty;

    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;

    private final ModelMapper modelMapper;

    public ProductImpl(ProductRepository productRepository, ProducerRepository producerReposiroty ,CategoryRepository categoryReponsitory, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.categoryReponsitory = categoryReponsitory;
        this.producerReposiroty = producerReposiroty;
        this.modelMapper = modelMapper;
    }



    @Override
    public BaseResponse<Page<ProductDTO>> getAll(ProductFilterRequest filterRequest, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductEntity> productEntities = productRepository.findAllByFilter(filterRequest, pageable);

        if (productEntities != null && !productEntities.isEmpty()) {
            Page<ProductDTO> pageData = productEntities.map(productEntity -> {
                ProductDTO productDTO = modelMapper.map(productEntity, ProductDTO.class);
                productDTO.setCategory(productEntity.getCategoryEntity().getName());
                productDTO.setProducer(productEntity.getProducerEntity().getName());

                productDTO.setProducerId(productEntity.getProducerEntity().getId());
                productDTO.setCategoryId(productEntity.getCategoryEntity().getId());

                String sizeNames = productEntity.getSizeEntities().stream().map(SizeEntity::getName).collect(Collectors.joining(" ,"));
                List<String> imagesColor = productEntity.getColorEntities().stream().map(ColorEntity::getImage).collect(Collectors.toList());
                productDTO.setSize(sizeNames);
                productDTO.setImagesColor(imagesColor);
                List<Long> sizeIds = productEntity.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
                productDTO.setSizeId(sizeIds);
                List<Long> colorId = productEntity.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
                productDTO.setColorId(colorId);
                return productDTO;
            });

            BaseResponse<Page<ProductDTO>> response = new BaseResponse<>();
            response.setCode(HttpStatus.OK.value());
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

        Optional<ProducerEntity> producer = producerReposiroty.findById(productDTO.getProducerId());

        if (producer.isEmpty()) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("producer not exists in system");
            return baseResponse;
        }

        Set<SizeEntity> sizeEntities = sizeRepository.findByIds(productDTO.getSizeId());

        if (CollectionUtils.isEmpty(sizeEntities)) {
            baseResponse.setCode(HttpStatus.BAD_REQUEST.value());
            baseResponse.setMessage("size not exits in system");
            return baseResponse;
        }

        Set<ColorEntity> colorEntities = colorRepository.findByIdIsInAndDeletedIsFalse(productDTO.getColorId());

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
            productEntity.getSizeEntities().clear();
            productEntity.getColorEntities().clear();
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

        ProductDTO productDTO = modelMapper.map(productEntity, ProductDTO.class);
        productDTO.setCategoryId(productEntity.getCategoryEntity().getId());
        productDTO.setProducerId(productEntity.getProducerEntity().getId());
        productDTO.setSizeId(productEntity.getSizeEntities().stream().map(data -> data.getId()).collect(Collectors.toList()));
        productDTO.setColorId(productEntity.getColorEntities().stream().map(data -> data.getId()).collect(Collectors.toList()));
        productDTO.setCategory(productEntity.getCategoryEntity().getName());
        productDTO.setProducer(productEntity.getProducerEntity().getName());


        return productDTO;
    }



    @Override
    public BaseResponse<?> updateProduct(Long productId, ProductDTO productDTO) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(productId);
        if (optionalProductEntity.isPresent()) {
            ProductEntity productEntity = optionalProductEntity.get();
            productEntity.setName(productDTO.getName());
            productEntity.setCode(productDTO.getCode());
            productEntity.setMaterial(productDTO.getMaterial());
            productEntity.setQuantity(productDTO.getQuantity());
            productEntity.setPrice(productDTO.getPrice());
            productEntity.setImport_price(productDTO.getImport_price());
            productEntity.setDescription(productDTO.getDescription());

            modelMapper.map(productDTO, productEntity);
            Optional<CategoryEntity> categoryEntityOptional = categoryReponsitory.findById(productDTO.getCategoryId());
            if (categoryEntityOptional.isPresent()) {
                productEntity.setCategoryEntity(categoryEntityOptional.get());
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Category not found with id " + productDTO.getCategoryId());
                return response;
            }
            Set<SizeEntity> sizeEntities = sizeRepository.findByIds(productDTO.getSizeId());
            if (!CollectionUtils.isEmpty(sizeEntities)) {
                productEntity.setSizeEntities(sizeEntities);
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Size not found");
                return response;
            }

            Set<ColorEntity> colorEntities = colorRepository.findByIdIsInAndDeletedIsFalse(productDTO.getColorId());
            if (!CollectionUtils.isEmpty(colorEntities)) {
                productEntity.setColorEntities(colorEntities);
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("Color not found");
                return response;
            }

            Optional<ProducerEntity> producerEntities = producerReposiroty.findById(productDTO.getProducerId());
            if (producerEntities.isPresent()) {
                productEntity.setProducerEntity(producerEntities.get());
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("producer not found with id " + productDTO.getProducerId());
                return response;
            }


            productRepository.save(productEntity);

            response.setCode(HttpStatus.OK.value());
            response.setMessage("Update product with id " + productId + " successful");
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Product with id " + productId + " not found");
        }
        return response;
    }

    @Override
    public BaseResponse<List<ProductDTO>> findProductsByCategoryId(Long categoryId) {
        BaseResponse<List<ProductDTO>> response = new BaseResponse<>();
        List<ProductEntity> products = productRepository.findProductsByCategoryId(categoryId);
        if (products != null && !products.isEmpty()) {
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (ProductEntity product : products) {
                ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                List<Long> sizeIds = product.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
                List<Long> colorIds = product.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
                productDTO.setSizeId(sizeIds);
                productDTO.setColorId(colorIds);
                productDTOs.add(productDTO);
            }
            response.setData(productDTOs);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        return response;
    }
    @Override
    public BaseResponse<List<ProductDTO>> findProductsByName(String name) {
        BaseResponse<List<ProductDTO>> response = new BaseResponse<>();
        List<ProductEntity> products = productRepository.findProductsByName(name);
        if (products != null && !products.isEmpty()) {
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (ProductEntity product : products) {
                ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                List<Long> sizeIds = product.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
                List<Long> colorIds = product.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
                productDTO.setSizeId(sizeIds);
                productDTO.setColorId(colorIds);
                productDTOs.add(productDTO);
            }
            response.setData(productDTOs);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        return response;
    }

    @Override
    public BaseResponse<Page<ProductDTO>> searchproductCondition(String condition, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductEntity> pages = productRepository.searchProductByNameAndCode(condition, pageable);
        Page<ProductDTO> productDTOs = pages.map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTO.setCategory(product.getCategoryEntity().getName());
            productDTO.setProducer(product.getProducerEntity().getName());
            productDTO.setProducerId(product.getProducerEntity().getId());
            productDTO.setCategoryId(product.getCategoryEntity().getId());
            String sizeNames = product.getSizeEntities().stream().map(SizeEntity::getName).collect(Collectors.joining(" ,"));
            productDTO.setSize(sizeNames);
            List<String> imagesColor = product.getColorEntities().stream().map(ColorEntity::getImage).collect(Collectors.toList());
            productDTO.setImagesColor(imagesColor);
            List<Long> sizeIds = product.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
            productDTO.setSizeId(sizeIds);
            List<Long> colorIds = product.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
            productDTO.setColorId(colorIds);

            return productDTO;
        });

        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, productDTOs);
    }


    @Override
    public BaseResponse<List<ProductDTO>> getProductBestSellers() {
        BaseResponse<List<ProductDTO>> response = new BaseResponse<>();
        List<ProductEntity> productEntities = productRepository.productBestSeller();

        if (productEntities != null && !productEntities.isEmpty()) {
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (ProductEntity product : productEntities) {
                ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                List<Long> sizeIds = product.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
                List<Long> colorIds = product.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
                productDTO.setSizeId(sizeIds);
                productDTO.setColorId(colorIds);
                productDTOs.add(productDTO);
            }

            response.setData(productDTOs);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } else {
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }

        return response;
    }

    @Override
    public BaseResponse<List<ProductDTO>> findProductsInPriceRange(double minPrice, double maxPrice) {
        BaseResponse<List<ProductDTO>> response = new BaseResponse<>();
        List<ProductEntity> products = new ArrayList<>();

        if (minPrice < 0 || maxPrice < 0 || maxPrice < minPrice) {
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setCode(HttpStatus.BAD_REQUEST.value());
        } else {
            products = productRepository.findProductsInPriceRange(minPrice, maxPrice);
            List<ProductDTO> productDTOs = new ArrayList<>();
            for (ProductEntity product : products) {
                ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                List<Long> sizeIds = product.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
                List<Long> colorIds = product.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
                productDTO.setSizeId(sizeIds);
                productDTO.setColorId(colorIds);
                productDTOs.add(productDTO);
            }
            response.setData(productDTOs);
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            response.setCode(HttpStatus.OK.value());
        }

        return response;
    }

    @Override
    public BaseResponse<List<ProductDTO>> findAllProductNew() {
        BaseResponse<List<ProductDTO>> response = new BaseResponse<>();
        LocalDateTime startDate = LocalDateTime.now().minusDays(5);
        List<ProductEntity> newProducts = productRepository.listProductNew(startDate);
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (ProductEntity product : newProducts) {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            List<Long> sizeIds = product.getSizeEntities().stream().map(SizeEntity::getId).collect(Collectors.toList());
            List<Long> colorIds = product.getColorEntities().stream().map(ColorEntity::getId).collect(Collectors.toList());
            productDTO.setSizeId(sizeIds);
            productDTO.setColorId(colorIds);
            productDTOs.add(productDTO);
        }
        response.setData(productDTOs);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<Long> countProuct() {
        Long countProducts = productRepository.countProduct();
        BaseResponse<Long> response = new BaseResponse<>();
        response.setData(countProducts);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
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
