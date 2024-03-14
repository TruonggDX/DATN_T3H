package edu.t3h.clothes.model.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.List;

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

    List<RoleDTO> roleDtos;

}
