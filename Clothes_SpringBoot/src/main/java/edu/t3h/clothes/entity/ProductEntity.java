package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Table(name = "product")
@Entity
@Data
@EqualsAndHashCode(callSuper=false)
public class ProductEntity extends AbstractEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "material")
    private String material;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Float price;

    @Column(name = "import_price")
    private Float import_price;


    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    private CategoryEntity categoryEntity;


    @ManyToMany(cascade = CascadeType.ALL,mappedBy = "productEntities",fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    private Set<ColorEntity> colorEntities;


    @ManyToMany(cascade = CascadeType.ALL,mappedBy = "productEntities",fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    private Set<SizeEntity> sizeEntities;
}
