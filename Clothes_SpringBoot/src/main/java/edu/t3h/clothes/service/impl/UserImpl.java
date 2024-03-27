package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.*;
import edu.t3h.clothes.model.dto.CategoryDTO;
import edu.t3h.clothes.model.dto.RegisterAccountUserDTO;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.PasswordEncoderUtil;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
    public BaseResponse<UserDTO> registerAccountUserWithRole(RegisterAccountUserDTO userDTO) {
//        Optional<RoleEntity> roleEntities = roleRepository.findById(Long.parseLong(createUserform.getRoleId()));
//        RoleEntity roleEntity = roleEntities.get();
//
//        UserEntity entity = converter.toEntity(createUserform);
//        entity.getRoles().add(roleEntity);
//        repository.save(entity);
//
//        validateEntity(entity);
//        roleEntity.getUsers().add(entity);
//        roleRepository.save(roleEntity);
//
//        return converter.toDTO(entity);
        Optional<RoleEntity> roleEntities = roleRepository.findById(Long.parseLong(userDTO.getRoleId()));
        RoleEntity roleEntity = roleEntities.get();
     return  null;
    }

//    @Override
//    public BaseResponse<UserDTO> creatUserDto(UserDTO userDTO) {
//        UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);
//        userEntity.setDeleted(false);
//        userEntity.setCreatedDate(LocalDateTime.now());
//
//        String encodedPassword = PasswordEncoderUtil.encodePassword(userEntity.getPassword());
//        userEntity.setPassword(encodedPassword);
//        // Lấy danh sách quyền từ repository
//        List<RoleEntity> roleEntities = roleRepository.getRoleByUsername(userEntity.getUsername());
//
//        // Chuyển đổi danh sách quyền sang DTO
//        List<RoleDTO> roleDTOs = roleEntities.stream()
//                .map(roleEntity -> {
//                    RoleDTO roleDTO = modelMapper.map(roleEntity, RoleDTO.class);
//                    roleDTO.setId(roleEntity.getId());
//                    roleDTO.setName(roleEntity.getName());
//                    return roleDTO;
//                })
//                .collect(Collectors.toList());
//
//        // Gán danh sách quyền cho userDTO
//        userDTO.setRoleDtos(roleDTOs);
//
//        // Lưu thông tin người dùng vào cơ sở dữ liệu
//
//        // Trả về response
//        BaseResponse<UserDTO> response = new BaseResponse<>();
//        response.setCode(HttpStatus.OK.value());
//        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
//        response.setData(userDTO);
//
//        return response;
//    }


//    @Override
//    public BaseResponse<UserDTO> registerUserWithRole(String username, String password) {
//        String encodedPassword = PasswordEncoderUtil.encodePassword(password);
//
//        UserEntity userEntity = new UserEntity();
//        userEntity.setUsername(username);
//        userEntity.setPassword(encodedPassword);
//
//        RoleEntity userRole = new RoleEntity();
//        userRole.setName("USER");
//        userEntity.getRoles().add(userRole);
//
//        userEntity = userEntityRepository.save(userEntity);
//
//        UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
//        userDTO.setId(userEntity.getId());
//
//        BaseResponse<UserDTO> response = new BaseResponse<>();
//        response.setCode(HttpStatus.OK.value());
//        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
//        response.setData(userDTO);
//
//        return response;
//    }
//
//

}
