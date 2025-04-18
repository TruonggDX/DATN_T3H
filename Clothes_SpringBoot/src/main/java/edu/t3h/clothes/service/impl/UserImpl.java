package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.RoleDTO;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.request.ChangePassword;
import edu.t3h.clothes.model.request.UserRequest;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import edu.t3h.clothes.utils.Constant;
import edu.t3h.clothes.utils.GenarateCode;
import edu.t3h.clothes.utils.PasswordEncoderUtil;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service

public class UserImpl implements IUserService {
    private Logger logger = LoggerFactory.getLogger(UserImpl.class);
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO findUserByUsername(String username) {
        UserEntity userEntity = userEntityRepository.findByUsername(username);
        UserDTO userDTO = modelMapper.map(userEntity,UserDTO.class);
        List<RoleDTO> roleDTOS = roleRepository.getRoleByUsername(username).stream().map(roleEntity -> modelMapper.map(roleEntity,RoleDTO.class)).toList();
        userDTO.setRoleDtos(roleDTOS);
        return userDTO;
    }
    @Override
    public BaseResponse<?> createAccount(UserRequest userRequest) {
        BaseResponse<?> response = new BaseResponse<>();

        RoleEntity roleId = roleRepository.findById(userRequest.getRoleId()).orElse(null);
        UserEntity newUser = new UserEntity();
        Set<RoleEntity> roles = newUser.getRoles();
        if (roles == null){
            roles = new HashSet<>();
        }
        if (roleId != null){
            roles.add(roleId);
        }
        newUser.setCode(GenarateCode.generateAccountCode());
        newUser.setUsername(userRequest.getUsername());
        newUser.setPassword(PasswordEncoderUtil.encodePassword(userRequest.getPassword()));
        newUser.setRoles(roles);
        userEntityRepository.save(newUser);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<Page<UserDTO>> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserEntity> pages = userEntityRepository.listUser(pageable);

        List<UserDTO> userdto = pages.getContent().stream().map(userEntity -> {
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

        BaseResponse<Page<UserDTO>> response = new BaseResponse<>();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(new PageImpl<>(userdto, pageable, pages.getTotalElements()));
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
        return userDTO;
    }


    @Override
    public BaseResponse<?> deleteAccount(Long id) {
        BaseResponse<?> response = new BaseResponse<>();
        Optional<UserEntity> optionalUserEntity = userEntityRepository.findById(id);
        if (optionalUserEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        UserEntity userEntity = optionalUserEntity.get();
        userEntity.getRoles().clear();
        userEntity.setDeleted(true);
        userEntityRepository.save(userEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<UserDTO> checkLoyalCustomer() {
        BaseResponse<UserDTO> response = new BaseResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String currentUsername = authentication.getName();
            UserEntity currentUser = userEntityRepository.findByUsername(currentUsername);
            if (currentUser != null) {
                Integer orderCount = userEntityRepository.countOrdersByUserId(currentUser.getId());
                boolean isLoyal = orderCount != null && orderCount >= 5;
                currentUser.setLoyalCustomers(isLoyal);
                userEntityRepository.save(currentUser);
                UserDTO userDTO = modelMapper.map(currentUser, UserDTO.class);
                response.setData(userDTO);
                response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
                response.setCode(HttpStatus.OK.value());
            } else {
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                response.setCode(HttpStatus.NOT_FOUND.value());
            }
        } else {
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            response.setCode(HttpStatus.UNAUTHORIZED.value());
        }

        return response;
    }

    @Override
    public BaseResponse<UserDTO> updateUser(Long userId, UserDTO updatedUser) {
        Optional<UserEntity> optionalUserEntity = userEntityRepository.findById(userId);
        if (optionalUserEntity.isEmpty()) {
            return new BaseResponse<>(HttpStatus.NOT_FOUND.value(), "User not found", null);
        }
        UserEntity userEntity = optionalUserEntity.get();
        userEntity.setUsername(updatedUser.getUsername());
        userEntity.setEmail(updatedUser.getEmail());
        userEntity.setName(updatedUser.getName());
        userEntity.setCode(updatedUser.getCode());
        userEntity.setEmail(updatedUser.getEmail());
        userEntity.setPhone(updatedUser.getPhone());
        userEntity.setAddress(updatedUser.getAddress());
        userEntity.setBirthday(updatedUser.getBirthday());
        UserEntity savedUserEntity = userEntityRepository.save(userEntity);
        UserDTO userDTO = modelMapper.map(savedUserEntity, UserDTO.class);
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, userDTO);
    }

    @Override
    public BaseResponse<UserDTO> getUser() {
        BaseResponse<UserDTO> response = new BaseResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            UserEntity userEntity = userEntityRepository.findByUsername(username);
            if (userEntity != null) {
                UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
                response.setData(userDTO);
                response.setCode(HttpStatus.OK.value());
                response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
                return response;
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                return response;
            }
        }
        return response;
    }

    @Override
    public BaseResponse<UserDTO> updateProfile(UserDTO userDTO) {
        BaseResponse<UserDTO> response = new BaseResponse<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            UserEntity userEntity = userEntityRepository.findByUsername(username);
            if (userEntity != null) {
                userEntity.setId(userDTO.getId());
                userEntity.setName(userDTO.getName());
                userEntity.setUsername(userDTO.getUsername());
                userEntity.setAddress(userDTO.getAddress());
                userEntity.setBirthday(userDTO.getBirthday());
                userEntity.setPhone(userDTO.getPhone());
                userEntity.setEmail(userDTO.getEmail());
                userDTO = modelMapper.map(userEntity, UserDTO.class);
                response.setData(userDTO);
                response.setCode(HttpStatus.OK.value());
                response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
                return response;
            } else {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                return response;
            }
        }
        return response;
    }

    @Override
    public BaseResponse<Integer> countAccount() {
        Integer cartAccount = userEntityRepository.countUserInSystem();
        BaseResponse<Integer> response = new BaseResponse<>();
        response.setData(cartAccount);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<Page<UserDTO>> searchByCondition(String condition, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserEntity> userPage = userEntityRepository.searchUsers(condition, pageable);
        Page<UserDTO> userDTOPage = userPage.map(userEntity -> {
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
        });
        return new BaseResponse<>(HttpStatus.OK.value(), Constant.HTTP_MESSAGE.SUCCESS, userDTOPage);
    }


    @Override
    public BaseResponse<Void> updatePass(long id, ChangePassword changePassword) {
        BaseResponse<Void> response = new BaseResponse<>();
        BaseResponse<UserDTO> userResponse = getUserByName(id);
        if (userResponse.getCode() != HttpStatus.OK.value()) {
            response.setCode(userResponse.getCode());
            response.setMessage(userResponse.getMessage());
            return response;
        }

        UserDTO userDTO = userResponse.getData();
        UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);
        Set<RoleEntity> roles = userEntity.getRoles();

        if (changePassword.getOldPassword() == null || changePassword.getNewPassword() == null || changePassword.getConfirmPassword() == null) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        if (!PasswordEncoderUtil.matches(changePassword.getOldPassword(), userEntity.getPassword())) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        if (!changePassword.getNewPassword().equals(changePassword.getConfirmPassword())) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }


        String encodedPassword = PasswordEncoderUtil.encodePassword(changePassword.getNewPassword());
        userEntity.setPassword(encodedPassword);
        userEntityRepository.save(userEntity);
        userEntity.setRoles(roles);
        userEntityRepository.save(userEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }



    @Override
    public BaseResponse<UserDTO> getUserByName(Long id) {
        BaseResponse<UserDTO> response = new BaseResponse<>();
        UserEntity userEntity = userEntityRepository.findById(id).orElse(null);
        if (userEntity == null) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
        response.setData(userDTO);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}
