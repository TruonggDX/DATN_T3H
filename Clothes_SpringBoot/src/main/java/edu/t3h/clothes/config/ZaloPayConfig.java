package edu.t3h.clothes.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class ZaloPayConfig {

  @Value("2554")
  private String appId;
  @Value("sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn")
  private String key1;
  @Value("trMrHtvjo6myautxDUiAcYsVtaeQ8nhf")
  private String key2;
  @Value("https://sb-openapi.zalopay.vn/v2/create")
  private String endPoint;
  @Value("https://sb-openapi.zalopay.vn/v2/query")
  private String orderstatus;
}
