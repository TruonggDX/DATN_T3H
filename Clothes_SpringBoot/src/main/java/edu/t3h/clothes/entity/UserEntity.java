package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
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
    @Column (name = "loyal_customers")
    private Boolean loyalCustomers;


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_tg",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roles = new HashSet<>();


    @OneToMany(mappedBy = "user")
    private List<RateEntity> rates;

    @OneToMany(mappedBy = "user")
    private List<OrdersEntity> orders;



}
