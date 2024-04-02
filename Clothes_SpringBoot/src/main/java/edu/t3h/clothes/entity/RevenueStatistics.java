package edu.t3h.clothes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "revenue_statistics")
public class RevenueStatistics extends AbstractEntity {
    private Integer quantity;
    @Column(name = "name_product")
    private String nameProduct;
    @Column(name = "price_sell")
    private Double priceSell;
    @Column(name = "total_sell")
    private Double totalSell;
}
