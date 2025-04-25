package edu.t3h.clothes.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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

@Data
@Entity
@Table(name = "voucher")
public class VoucherEntity extends AbstractEntity{

    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name; //tên voucher
    @Column(name = "description")
    private String description; //mô tả voucher
    @Column(name = "description_type")
    private String description_type;   //giá trị giảm theo % hay tiền
    @Column(name = "discount_value")
    private Float discount_value; //giá trị giảm
    @Column(name = "min_order_amount")
    private Float min_order_amount; //giá trị đơn hàng tối thiểu
    @Column(name = "quantity")
    private Integer quantity; //số lượng voucher
    @Column(name = "is_active")
    private Boolean is_active; //trạng thái voucher
    @Column(name = "start_date")
    private Date start_date; //ngày bắt đầu
    @Column(name = "end_date")
    private Date end_date; //ngày kết thúc

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "voucher_product", joinColumns = @JoinColumn(name = "voucher_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<ProductEntity> products = new HashSet<>();

}
