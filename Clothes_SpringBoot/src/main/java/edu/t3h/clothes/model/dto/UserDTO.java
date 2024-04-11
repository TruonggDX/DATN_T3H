package edu.t3h.clothes.model.dto;

import edu.t3h.clothes.entity.RoleEntity;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String code;
    private String username;
    private String email;
    private String phone;
    private String address;
    private String birthday;
    private int loyalCustomers;
    private String password;
    private Long roleId;
    private String nameRole;

    List<RoleDTO> roleDtos;






}
