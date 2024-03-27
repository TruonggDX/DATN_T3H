package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class RegisterAccountUserDTO {
    private Long id;
    private String username;
    private String password;
    private String roleId;
}
