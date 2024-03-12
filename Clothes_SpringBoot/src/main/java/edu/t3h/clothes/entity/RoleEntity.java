package edu.t3h.clothes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Table(name = "role")
@Data
@Entity
public class RoleEntity extends AbstractEntity{
    @Column (name = "name")
    private String name;


    @ManyToMany(mappedBy = "roles")
    private Set<UserEntity> users = new HashSet<>();
}
