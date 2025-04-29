package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.model.dto.AccountDto;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

  @Mapping(target = "roleIds", source = "roles")
  AccountDto toDto(AccountEntity accountEntity);

  AccountEntity toEntity(AccountDto accountDto);

  default Set<Long> roleIds(Set<RoleEntity> roleEntities) {
    return roleEntities.stream().map(RoleEntity::getId).collect(Collectors.toSet());
  }
}