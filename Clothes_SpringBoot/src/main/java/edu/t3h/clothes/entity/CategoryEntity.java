package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name = "category")
public class CategoryEntity extends AbstractEntity {
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryEntity() {
    }

    public CategoryEntity(String code, String name) {
        this.code = code;
        this.name = name;
    }
    @OneToMany(mappedBy = "categoryEntity", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<ProductEntity> productEntities;
}
