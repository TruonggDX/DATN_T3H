package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.CategoryEntity;
import edu.t3h.clothes.entity.SizeEntity;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.SizeRepository;
import edu.t3h.clothes.service.ISizeService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class SizeImpl implements ISizeService {
    private SizeRepository sizeRepository;
    private final ModelMapper modelMapper;
    public SizeImpl(SizeRepository sizeRepository,ModelMapper modelMapper){
        this.sizeRepository = sizeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BaseResponse<List<SizeDTO>> getAll() {
        List<SizeEntity> sizeEntities = sizeRepository.listSize();
        List<SizeDTO> sizeDTOs =  sizeEntities.stream()
                .map(sizeEntity -> modelMapper.map(sizeEntity,SizeDTO.class))
                .collect(Collectors.toList());
        BaseResponse<List<SizeDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(sizeDTOs);
        return response;
    }

    @Override
    public BaseResponse<?> creatSize(SizeDTO sizeDTO) {
        SizeEntity sizeEntity = modelMapper.map(sizeDTO,SizeEntity.class);
        sizeEntity.setDeleted(false);
        sizeEntity.setCreatedDate(LocalDateTime.now());
        sizeEntity = sizeRepository.save(sizeEntity);
        sizeDTO.setId(sizeEntity.getId());
        BaseResponse<SizeDTO> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage((Constant.HTTP_MESSAGE.SUCCESS));
        response.setData( sizeDTO);
        return response;
    }

    @Override
    public BaseResponse<?> deleteSize(Long id) {
        Optional<SizeEntity> sizeEntity = sizeRepository.findById(id);
        BaseResponse<List<SizeDTO>> baseResponse;
        if (sizeEntity.isEmpty()){
            baseResponse = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(),Constant.HTTP_MESSAGE.FAILED,null);
            return baseResponse;
        }
        SizeEntity size = sizeEntity.get();
        size.setDeleted(true);
        size.setModifiedDate(LocalDateTime.now());
        sizeRepository.save(size);

        List<SizeEntity> sizeEntities = sizeRepository.listSize();
        List<SizeDTO> sizeDTOs =  sizeEntities.stream()
                .map(sizeEntitys -> modelMapper.map(sizeEntitys,SizeDTO.class))
                .collect(Collectors.toList());
        baseResponse = new BaseResponse<>(HttpStatus.OK.value(),Constant.HTTP_MESSAGE.SUCCESS,sizeDTOs);
        return baseResponse;
    }

    @Override
    public SizeDTO findSizeDTOById(Long id) {
        Optional<SizeEntity> sizeEntityOptional = sizeRepository.findById(id);
        SizeEntity sizeEntity = null;
        BaseResponse<SizeDTO>response;

        if(sizeEntityOptional.isEmpty()){
            response = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(), Constant.HTTP_MESSAGE.FAILED,null);
            return modelMapper.map(response,SizeDTO.class);

        }
        sizeEntity = sizeEntityOptional.get();
        if (sizeEntity.getDeleted()){
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
            return  modelMapper.map(response,SizeDTO.class);
        }

        return modelMapper.map(sizeEntity,SizeDTO.class);
    }

    @Override
    public BaseResponse<?> updateSize(Long id, SizeDTO sizeDTO) {
        Optional<SizeEntity> sizeEntityOptional = sizeRepository.findById(id);
        if (sizeEntityOptional.isEmpty()){
            return  new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
        SizeEntity size = sizeEntityOptional.get();
        size.setName(sizeDTO.getName());
        sizeRepository.save(size);
        SizeDTO sizeDTOs = modelMapper.map(size, SizeDTO.class);
        return new BaseResponse<>(HttpStatus.OK.value(),Constant.HTTP_MESSAGE.SUCCESS,sizeDTOs);
    }
}
