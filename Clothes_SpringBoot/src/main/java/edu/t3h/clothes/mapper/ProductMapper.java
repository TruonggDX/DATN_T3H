package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.entity.ProductEntity;
import edu.t3h.clothes.entity.VoucherEntity;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.model.dto.ProductDto;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

  @Mapping(target = "categoryId", source = "categoryEntity.id")
  @Mapping(target = "brandId", source = "brandEntity.id")
  @Mapping(target = "voucherIds", source = "voucherEntities")
  @Mapping(target = "imageDtos", source = "imagesEntities")
  ProductDto toDto(ProductEntity productEntity);

  ProductEntity toEntity(ProductDto productDto);

  default Set<Long> voucherIds(Set<VoucherEntity> voucherEntities) {
    return voucherEntities.stream().map(VoucherEntity::getId).collect(Collectors.toSet());
  }

  default List<ImageDto> imagesToDto(List<ImagesEntity> imagesEntities) {
    return imagesEntities.stream().map(
            image -> new ImageDto(image.getId(), image.getUrl(), image.getPublicId(), image.getType()))
        .toList();
  }
}
