package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.entity.SizeEntity;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.SizeDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.service.IRoleService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleImpl implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public BaseResponse<List<RoleDTO>> getAll() {
        List<RoleEntity> roleEntities = roleRepository.listRole();
        List<RoleDTO> roleDTOS =  roleEntities.stream()
                .map(roleEntity -> modelMapper.map(roleEntity,RoleDTO.class))
                .collect(Collectors.toList());
        BaseResponse<List<RoleDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(roleDTOS);
        return response;
    }

    @Override
    public BaseResponse<?> creatRole(RoleDTO roleDTO) {
        RoleEntity roleEntity = modelMapper.map(roleDTO,RoleEntity.class);
        roleEntity.setDeleted(false);
        roleEntity.setCreatedDate(LocalDateTime.now());
        roleEntity = roleRepository.save(roleEntity);
        roleDTO.setId(roleEntity.getId());
        BaseResponse<RoleDTO> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage((Constant.HTTP_MESSAGE.SUCCESS));
        response.setData(roleDTO);
        return response;
    }

    @Override
    public BaseResponse<?> deleteRole(Long id) {
        Optional<RoleEntity> roleEntity = roleRepository.findById(id);
        BaseResponse<List<RoleDTO>> baseResponse;
        if (roleEntity.isEmpty()){
            baseResponse = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(),Constant.HTTP_MESSAGE.FAILED,null);
            return baseResponse;
        }
        RoleEntity roles = roleEntity.get();
        roles.setDeleted(true);
        roles.setModifiedDate(LocalDateTime.now());
        roleRepository.save(roles);

        List<RoleEntity> sizeEntities = roleRepository.listRole();
        List<RoleDTO> roless =  sizeEntities.stream()
                .map(role -> modelMapper.map(role,RoleDTO.class))
                .collect(Collectors.toList());
        baseResponse = new BaseResponse<>(HttpStatus.OK.value(),Constant.HTTP_MESSAGE.SUCCESS,roless);
        return baseResponse;
    }

    @Override
    public RoleDTO findRoleById(Long id) {
        Optional<RoleEntity> roleEntityOptional = roleRepository.findById(id);
        RoleEntity roleEntity = null;
        BaseResponse<RoleDTO>response;

        if(roleEntityOptional.isEmpty()){
            response = new BaseResponse<>(HttpStatus.BAD_GATEWAY.value(), Constant.HTTP_MESSAGE.FAILED,null);
            return modelMapper.map(response,RoleDTO.class);

        }
        roleEntity = roleEntityOptional.get();
        if (roleEntity.getDeleted()){
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
            return  modelMapper.map(response,RoleDTO.class);
        }

        return modelMapper.map(roleEntity,RoleDTO.class);
    }

    @Override
    public BaseResponse<?> updateRole(Long id, RoleDTO roleDTO) {
        Optional<RoleEntity> roleEntityOptional = roleRepository.findById(id);
        if (roleEntityOptional.isEmpty()){
            return  new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED,null);
        }
        RoleEntity role = roleEntityOptional.get();
        role.setName(roleDTO.getName());
        roleRepository.save(role);
        RoleDTO roleDTOs = modelMapper.map(role, RoleDTO.class);
        return new BaseResponse<>(HttpStatus.OK.value(),Constant.HTTP_MESSAGE.SUCCESS,roleDTOs);
    }
}
