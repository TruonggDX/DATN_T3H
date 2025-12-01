package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.dto.ProductDto;
import edu.t3h.clothes.model.dto.ProductIndex;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

  @Mapping(target = "categoryId", source = "categoryEntity.id")
  @Mapping(target = "categoryName", source = "categoryEntity.name")
  @Mapping(target = "brandId", source = "brandEntity.id")
  @Mapping(target = "brandName", source = "brandEntity.name")
  @Mapping(target = "imageDtos", source = "imagesEntities")
  ProductDto toDto(ProductEntity productEntity);

  @Mapping(target = "categoryId", source = "categoryEntity.id")
  @Mapping(target = "categoryName", source = "categoryEntity.name")
  @Mapping(target = "brandId", source = "brandEntity.id")
  @Mapping(target = "brandName", source = "brandEntity.name")
  @Mapping(target = "imageDtos", source = "imagesEntities")
  ProductIndex toIndex(ProductEntity productEntity);

  ProductEntity toEntity(ProductDto productDto);

  ProductDto toDto2(ProductIndex productIndex);

  default List<ImageDto> imagesToDto(List<ImagesEntity> imagesEntities) {
    if (imagesEntities == null) {
      return new ArrayList<>();
    }

    return imagesEntities.stream()
        .map(image -> new ImageDto(image.getId(), image.getUrl(), image.getPublicId(), image.getType()))
        .collect(Collectors.toList());
  }

}
