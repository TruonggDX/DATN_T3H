package edu.t3h.clothes.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class MomoConfig {

  @Value("MOMO")
  private String PARTNER_CODE;
  @Value("F8BBA842ECF85")
  private String ACCESS_KEY;
  @Value("K951B6PE1waDMi640xX08PD3vg6EkVlz")
  private String SECRET_KEY;
  @Value("http://localhost:3000/success")
  private String REDIRECT_URL;
  @Value("https://callback.url/notify")
  private String IPN_URL;
  @Value("payWithMethod")
  private String REQUEST_TYPE;
}
