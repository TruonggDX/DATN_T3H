package edu.t3h.clothes.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class AccountDto {
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

    List<RoleDto> roleDtos;

}
