package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ReviewEntity;
import edu.t3h.clothes.model.dto.ReviewDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

  @Mapping(target = "accountId", source = "account.id")
  @Mapping(target = "productId", source = "productEntity.id")
  ReviewDto toDto(ReviewEntity reviewEntity);

  ReviewEntity toEntity(ReviewDto dto);
}
