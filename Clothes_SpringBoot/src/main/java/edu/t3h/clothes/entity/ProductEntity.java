package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Table(name = "product")
@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
public class ProductEntity extends AbstractEntity {

    private String code;

    private String name;

    private String material;

    private String description;

    private Integer quantity;

    private Float price;

    private Float import_price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    private CategoryEntity categoryEntity;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "product_color",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    @EqualsAndHashCode.Exclude
    private Set<ColorEntity> colorEntities;



    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "product_size",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id")
    )
    @EqualsAndHashCode.Exclude
    private Set<SizeEntity> sizeEntities;



    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "producer_product",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "producer_id")
    )
    @EqualsAndHashCode.Exclude
    private Set<ProducerEntity> producerEntities;


    public ProductEntity() {
    }


}
