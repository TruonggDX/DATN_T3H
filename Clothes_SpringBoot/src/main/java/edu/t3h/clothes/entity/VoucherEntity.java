package edu.t3h.clothes.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "voucher")
public class VoucherEntity extends AbstractEntity{

    private String code;
    private String name;
    private String description;
    private String descriptionType;
    private Float discountValue;
    private Float minOrderAmount;
    private Integer quantity;
    private Boolean status;
    private Date startDate;
    private Date endDate;

    @ManyToMany(mappedBy = "voucherEntities", fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    private Set<ProductEntity> productEntities = new HashSet<>();

}
