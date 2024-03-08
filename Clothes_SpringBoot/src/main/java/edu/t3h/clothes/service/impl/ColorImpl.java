package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.ColorEntity;
import edu.t3h.clothes.model.dto.ColorDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.ColorRepository;
import edu.t3h.clothes.service.IColorService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ColorImpl implements IColorService {

    private ColorRepository colorRepository;
    private final ModelMapper modelMapper;

    public ColorImpl(ColorRepository colorRepository,ModelMapper modelMapper){
        this.colorRepository = colorRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public BaseResponse<List<ColorDTO>> getAll() {
        List<ColorEntity> colorEntities = colorRepository.listColor();
        List<ColorDTO> colorDTOS = colorEntities.stream()
                .map(colorEntity -> modelMapper.map(colorEntity,ColorDTO.class))
                .collect(Collectors.toList());
        BaseResponse<List<ColorDTO>> response =new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(colorDTOS);
        return response;
    }

    @Override
    public BaseResponse<?> createColor(ColorDTO colorDTO) {
        ColorEntity colorEntity = modelMapper.map(colorDTO, ColorEntity.class);
        colorEntity.setDeleted(false);
        colorEntity.setCreatedDate(LocalDateTime.now());
        colorEntity = colorRepository.save(colorEntity);
        colorDTO.setId(colorEntity.getId());
        BaseResponse<ColorDTO> response = new BaseResponse<>();
        response.setCode((HttpStatus.OK.value()));
        response.setMessage((Constant.HTTP_MESSAGE.SUCCESS));
        response.setData(colorDTO);
        return response;
    }

    @Override
    public BaseResponse<?> delete(Long id) {
        Optional<ColorEntity> colorEntity = colorRepository.findById(id);
        BaseResponse<List<ColorDTO>> baseResponse;
        if (colorEntity.isEmpty()){
            baseResponse = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return baseResponse;
        }
        ColorEntity color = colorEntity.get();
        color.setDeleted(true);
        color.setModifiedDate(LocalDateTime.now());
        colorRepository.save(color);

        List<ColorEntity> colorEntities = colorRepository.listColor();
        List<ColorDTO> colorDTOS = colorEntities.stream()
                .map(colorEntity1 -> modelMapper.map(colorEntity1, ColorDTO.class))
                .collect(Collectors.toList());
        baseResponse = new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, colorDTOS);
        return baseResponse;
    }

    @Override
    public ColorDTO findColorDTOById(Long id) {
        Optional<ColorEntity> colorEntityOptional= colorRepository.findById(id);
        ColorEntity colorEntity = null;
        BaseResponse<ColorDTO> response;
        if (colorEntityOptional.isEmpty()){
            response = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ColorDTO.class);
        }
        colorEntity = colorEntityOptional.get();
        if (colorEntity.getDeleted()){
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, ColorDTO.class);
        }
        return modelMapper.map(colorEntity, ColorDTO.class);
    }

    @Override
    public BaseResponse<?> updateColor(Long id, ColorDTO colorDTO) {
        Optional<ColorEntity> colorEntityOptional = colorRepository.findById(id);
        if (colorEntityOptional.isEmpty()){
            return new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);

        }
        ColorEntity color = colorEntityOptional.get();
        color.setName(colorDTO.getName());
        colorRepository.save(color);
        ColorDTO colorDTO1 = modelMapper.map(color, ColorDTO.class);
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, colorDTO1);

    }
}
