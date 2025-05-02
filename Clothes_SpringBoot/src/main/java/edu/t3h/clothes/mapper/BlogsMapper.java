package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.BlogsEntity;
import edu.t3h.clothes.model.dto.BlogsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BlogsMapper {

  @Mapping(target = "accountId", source = "account.id")
  @Mapping(target = "categoryId", source = "categoryEntity.id")
  BlogsDto toDto(BlogsEntity blogsEntity);

  BlogsEntity toEntity(BlogsDto blogsDto);
}
