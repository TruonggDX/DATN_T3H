package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class UserImpl implements IUserService {

    private UserEntityRepository userEntityRepository;
    private ModelMapper modelMapper;

    public UserImpl(UserEntityRepository userEntityRepository, ModelMapper modelMapper) {
        this.userEntityRepository = userEntityRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BaseResponse<List<UserDTO>> getAll() {
        List<UserEntity> userEntities = userEntityRepository.findAll();

        List<UserDTO> userDTOS = userEntities.stream()
                .map(userEntity -> modelMapper.map(userEntity, UserDTO.class))
                .collect(Collectors.toList());
        BaseResponse<List<UserDTO>> response = new BaseResponse<>();
        response.setCode(200);
        response.setMessage("List user");
        response.setData(userDTOS);
        return response;
    }

    @Override
    public BaseResponse<?> creatUser(UserDTO userDTO) {
        UserEntity user = modelMapper.map(userDTO,UserEntity.class);
        userEntityRepository.save(user);

        BaseResponse<UserDTO> userDTOBaseResponse = new BaseResponse<>();
        userDTOBaseResponse.setCode(200);
        userDTOBaseResponse.setMessage("add user sucessful");
        userDTOBaseResponse.setData(modelMapper.map(user,UserDTO.class));
        return userDTOBaseResponse;
    }

    @Override
    public UserDTO findById(Long id) {
        Optional<UserEntity> userEntity = userEntityRepository.findById(id);
        if (userEntity.isPresent()){
            UserEntity users = userEntity.get();
            return modelMapper.map(users, UserDTO.class);
        }else {
            return  null;
        }
    }

    @Override
    public BaseResponse<?> deleteUser(Long id) {
        Optional<UserEntity> userEntity = userEntityRepository.findById(id);
        BaseResponse<List<UserDTO>> baseResponse;

        if (userEntity.isPresent()){
            userEntityRepository.delete(userEntity.get());
            List<UserEntity> userEntities = userEntityRepository.findAll();
            List<UserDTO> userDTOS = userEntities.stream()
                    .map(user -> modelMapper.map(user, UserDTO.class))
                    .collect(Collectors.toList());
            baseResponse = new BaseResponse<>(200,"delete successful",userDTOS);
        }else {
            baseResponse = new BaseResponse<>(404,"delete failed",null);
        }
        return baseResponse;
    }

    @Override
    public BaseResponse<?> updateUser(Long id, UserDTO userDTO) {
        return null;
    }
}
