package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class UserImpl implements IUserService {
    private Logger logger = LoggerFactory.getLogger(UserImpl.class);
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    public UserImpl() {
        logger.info("Tạo ra bean: {}",UserImpl.class);
    }


    @Override
    public UserDTO findUserByUsername(String username) {
        UserEntity userEntity = userEntityRepository.findByUsername(username);
        UserDTO userDTO = modelMapper.map(userEntity,UserDTO.class);
        List<RoleDTO> roleDTOS = roleRepository.getRoleByUsername(username).stream().map(roleEntity -> modelMapper.map(roleEntity,RoleDTO.class)).toList();
        userDTO.setRoleDtos(roleDTOS);
        return userDTO;
    }

    @Override
    public BaseResponse<List<UserDTO>> getAll() {
        List<UserEntity> userEntities = userEntityRepository.listUser();
        List<UserDTO> userDTOS = userEntities.stream().map(userEntity -> {
            UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);

            List<RoleDTO> roleDtos = userEntity.getRoles().stream()
                    .map(roleEntity -> {
                        RoleDTO roleDTO = modelMapper.map(roleEntity, RoleDTO.class);
                        return roleDTO;
                    })
                    .collect(Collectors.toList());
            userDTO.setRoleDtos(roleDtos);
            return userDTO;
        }).collect(Collectors.toList());

        BaseResponse<List<UserDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(userDTOS);

        return response;
    }



}
