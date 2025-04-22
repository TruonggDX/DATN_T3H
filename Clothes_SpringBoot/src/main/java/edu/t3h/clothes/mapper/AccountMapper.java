package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.entity.ImagesEntity;
import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.model.dto.AccountDto;
import edu.t3h.clothes.repository.ImageRepository;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountMapper {
    private final ImageRepository imageRepository;
    private final RoleMapper roleMapper;
    public AccountDto toDto(AccountEntity userEntity) {
        AccountDto dto = new AccountDto();
        dto.setId(userEntity.getId());
        dto.setCode(userEntity.getCode());
        dto.setFullname(userEntity.getFullname());
        dto.setPhone(userEntity.getPhone());
        dto.setEmail(userEntity.getEmail());
        dto.setEnabled(userEntity.isEnabled());
        dto.setRoles(userEntity.getRoles()
                .stream()
                .map(roleMapper::toDto)
                .collect(Collectors.toSet()));
        ImagesEntity images = imageRepository.findByAccountId(dto.getId());
        if (images != null) {
            dto.setImageUrl(images.getUrl());
        }
        Set<Long> roleId = userEntity.getRoles().stream().map(RoleEntity::getId).collect(Collectors.toSet());
        dto.setRoleIds(roleId);
        return dto;
    }

}