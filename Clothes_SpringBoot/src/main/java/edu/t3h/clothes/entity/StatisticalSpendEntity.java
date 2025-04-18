package edu.t3h.clothes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "statistical_spend")
public class StatisticalSpendEntity extends AbstractEntity {
    @Column(name = "name_product")
    public String nameProduct;
    private Integer quantity;
    @Column(name = "price_spend")
    private Double priceSend;
    @Column(name = "total_spend")
    private Double totalSpend;
}
