package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@Getter
@Setter
@Entity
@Table(name = "size")
public class SizeEntity {
    @Id
    @Column(name = "id")
    private Long id;
    private String name;
    private Integer deleted;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinTable(name = "product_size",
            joinColumns = @JoinColumn(name = "size_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<ProductEntity> productEntities;
}
