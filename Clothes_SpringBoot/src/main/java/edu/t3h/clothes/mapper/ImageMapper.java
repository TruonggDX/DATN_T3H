package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.model.dto.ImageDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {

  ImageDto toDto(ImagesEntity imagesEntity);

  ImagesEntity toEntity(ImageDto imageDto);
}
