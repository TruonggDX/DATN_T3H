package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
//import edu.t3h.clothes.utils.PasswordEncoderUtil;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.*;
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
            Set<RoleEntity> roleEntities = userEntity.getRoles();
            List<RoleDTO> roleDTOs = roleRepository.getRoleByUsername(userEntity.getUsername()).stream()
                    .map(roleEntity -> {
                        RoleDTO roleDTO = modelMapper.map(roleEntity, RoleDTO.class);
                        roleDTO.setId(roleEntity.getId());
                        roleDTO.setName(roleEntity.getName());
                        return roleDTO;
                    })
                    .collect(Collectors.toList());

            userDTO.setRoleDtos(roleDTOs);
            return userDTO;
        }).collect(Collectors.toList());

        BaseResponse<List<UserDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(userDTOS);

        return response;
    }
    @Override
    public UserDTO findUserById(Long id) {
        Optional<UserEntity> userEntities = userEntityRepository.findById(id);
        UserEntity userEntity = null;
        BaseResponse<UserDTO> response;

        if (userEntities.isEmpty()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, UserDTO.class);
        }

        userEntity = userEntities.get();
        if (userEntity.getDeleted()) {
            response = new BaseResponse<>(HttpStatus.BAD_REQUEST.value(), Constant.HTTP_MESSAGE.FAILED, null);
            return modelMapper.map(response, UserDTO.class);
        }
        UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
        Set<RoleEntity> roleEntities = userEntity.getRoles();
        List<RoleDTO> roleDTOs = roleRepository.getRoleByUsername(userEntity.getUsername()).stream()
                .map(roleEntity -> {
                    RoleDTO roleDTO = modelMapper.map(roleEntity, RoleDTO.class);
                    roleDTO.setId(roleEntity.getId());
                    roleDTO.setName(roleEntity.getName());
                    return roleDTO;
                })
                .collect(Collectors.toList());
        userDTO.setRoleDtos(roleDTOs);
        return modelMapper.map(userEntity, UserDTO.class);
    }


    @Override
    public BaseResponse<?> deleteAccount(Long id) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<UserEntity> optionalUserEntity = userEntityRepository.findById(id);
        if (optionalUserEntity.isPresent()) {
            UserEntity userEntity = optionalUserEntity.get();

            userEntity.getRoles().clear();

            userEntity.setDeleted(true);
            userEntityRepository.save(userEntity);


            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        } else {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
        }
        return response;
    }


    public BaseResponse<UserDTO> checkLoyalCustomer(Long userId) {
        BaseResponse<UserDTO> response = new BaseResponse<>();
        Optional<UserEntity> userOptional = userEntityRepository.findById(userId);
        if (!userOptional.isPresent()) {
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setCode(HttpStatus.NOT_FOUND.value());
            return response;
        }
        Integer orderCount = userEntityRepository.countOrdersByUserId(userId);
        boolean isLoyal = orderCount != null && orderCount >= 5;
        UserEntity user = userOptional.get();
        user.setLoyalCustomers(isLoyal);
        userEntityRepository.save(user);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        response.setData(userDTO);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());

        return response;
    }
}
