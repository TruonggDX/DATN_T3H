package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ImageProductEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.dto.ImageProductDTO;
import edu.t3h.clothes.model.dto.ProductDTO;
import edu.t3h.clothes.model.request.ProductImageFilterRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.ImageProductRepository;
import edu.t3h.clothes.repository.ProductRepository;
import edu.t3h.clothes.service.IImageProductService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageProductImpl implements IImageProductService {
    @Autowired
    private ImageProductRepository imageProductRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public BaseResponse<ImageProductDTO> findByProductId(ProductImageFilterRequest productImageFilterRequest) {
        ImageProductEntity imageProductEntity = imageProductRepository.findImageProductById(productImageFilterRequest);
        BaseResponse<ImageProductDTO> response = new BaseResponse<>();
        if (imageProductEntity == null){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        ImageProductDTO imageProductDTO = modelMapper.map(imageProductEntity,ImageProductDTO.class);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(imageProductDTO);
        return response;
    }
}
