package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name ="user")
public class UserEntity extends AbstractEntity{
    @Column(name = "name")
    private String name;
    @Column(name = "code")
    private String code;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column (name = "phone")
    private String phone;
    @Column (name = "address")
    private String address;
    @Column (name = "birthday")
    private String birthday;
    @Column (name = "loyalCustomers")
    private int loyalCustomers;




    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_tg",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<RoleEntity> roleEntities;
}
