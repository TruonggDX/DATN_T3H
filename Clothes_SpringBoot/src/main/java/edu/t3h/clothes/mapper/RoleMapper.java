package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.model.dto.RoleDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

  RoleDto toDto(RoleEntity roleEntity);

  RoleEntity toEntity(RoleDto roleDto);
}
