package edu.t3h.clothes.config;

import edu.t3h.clothes.utils.VNPayUtil;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class VNPAYConfig {

  @Value("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html")
  private String vnp_PayUrl;
  @Value("http://localhost:3000/success")
  private String vnp_ReturnUrl;
  @Value("N3AB31WQ")
  private String vnp_TmnCode;
  @Value("FCIUBKDHMTQDPMYWJNBOIFFMACMRSTZC")
  private String secretKey;
  @Value("2.1.0")
  private String vnp_Version;
  @Value("pay")
  private String vnp_Command;
  @Value("other")
  private String orderType;

  public Map<String, String> getVNPayConfig() {
    Map<String, String> vnpParamsMap = new HashMap<>();
    vnpParamsMap.put("vnp_Version", this.vnp_Version);
    vnpParamsMap.put("vnp_Command", this.vnp_Command);
    vnpParamsMap.put("vnp_TmnCode", this.vnp_TmnCode);
    vnpParamsMap.put("vnp_CurrCode", "VND");
    vnpParamsMap.put("vnp_TxnRef", VNPayUtil.getRandomNumber(8));
    vnpParamsMap.put("vnp_OrderInfo", "Thanh toan don hang:" + VNPayUtil.getRandomNumber(8));
    vnpParamsMap.put("vnp_OrderType", this.orderType);
    vnpParamsMap.put("vnp_Locale", "vn");
    vnpParamsMap.put("vnp_ReturnUrl", this.vnp_ReturnUrl);
    Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    String vnpCreateDate = formatter.format(calendar.getTime());
    vnpParamsMap.put("vnp_CreateDate", vnpCreateDate);
    calendar.add(Calendar.MINUTE, 15);
    String vnp_ExpireDate = formatter.format(calendar.getTime());
    vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);
    return vnpParamsMap;
  }
}