package edu.t3h.clothes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "statistical")
public class StatisticalEntity extends AbstractEntity {
    @Column(name = "price_spending")
    private Double priceSpending;
    private Double revenue;
    @Column(name = "total_prices")
    private Double totalPrices;
}
