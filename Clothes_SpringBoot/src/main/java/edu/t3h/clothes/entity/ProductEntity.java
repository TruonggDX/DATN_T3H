package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
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

    private Long quantity;

    private Double price;

    private Float import_price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    private CategoryEntity categoryEntity;

    @ManyToOne
    @JoinColumn(name = "producer_id")
    @EqualsAndHashCode.Exclude
    private ProducerEntity producerEntity;



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
    public ProductEntity() {
    }

    @OneToMany(mappedBy = "productEntities")
    private List<ImageProductEntity> imageEntities = new ArrayList<>();



    @OneToMany(mappedBy = "product")
    private List<CartEntity> carts;


    @OneToMany(mappedBy = "product")
    private List<RateEntity> rates;

    @OneToMany(mappedBy = "product")
    private List<OrdersEntity> product;

}
