package edu.t3h.clothes.model.dto;

import jakarta.persistence.Column;
import lombok.Data;

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

    public UserDTO(Long id, String name, String code, String username, String email, String phone, String address, String birthday, int loyalCustomers) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.birthday = birthday;
        this.loyalCustomers = loyalCustomers;
    }

    public UserDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public int getLoyalCustomers() {
        return loyalCustomers;
    }

    public void setLoyalCustomers(int loyalCustomers) {
        this.loyalCustomers = loyalCustomers;
    }
}
