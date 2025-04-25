package edu.t3h.clothes.model.dto;

import java.util.Date;
import java.util.Set;
import lombok.Data;

@Data
public class VoucherDto {
  private Long id;
  private String code;
  private String name; // tên voucher
  private String description; // mô tả voucher
  private String description_type; // loại giảm giá: %, tiền
  private Float discount_value; // giá trị giảm
  private Float min_order_amount; // đơn hàng tối thiểu
  private Integer quantity; // tổng số lượng
  private Integer used; // đã dùng
  private Boolean is_active; // trạng thái
  private Date start_date; // ngày bắt đầu
  private Date end_date; // ngày kết thúc

  private Set<Long> productIds;
}
