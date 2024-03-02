package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.model.dto.UserDTO;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.repository.UserEntityRepository;
import edu.t3h.clothes.service.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return null;
    }
}
