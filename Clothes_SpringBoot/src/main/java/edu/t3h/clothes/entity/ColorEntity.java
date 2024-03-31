package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;
@Entity
@Data
@Table(name = "color")

public class ColorEntity extends AbstractEntity{
    @Column(name = "name")
    private String name;
    @Column(nullable = true,length = 64)
    private String  image;




    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinTable(name = "product_color",
            joinColumns = @JoinColumn(name = "color_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<ProductEntity> productEntities;

}
