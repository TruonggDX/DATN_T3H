package edu.t3h.clothes.service.impl;

import edu.t3h.clothes.config.MomoConfig;
import edu.t3h.clothes.config.VNPAYConfig;
import edu.t3h.clothes.config.ZaloPayConfig;
import edu.t3h.clothes.exception.HmacSigningException;
import edu.t3h.clothes.model.response.VNPayResponse;
import edu.t3h.clothes.service.IPaymentService;
import edu.t3h.clothes.utils.VNPayUtil;
import edu.t3h.clothes.utils.crypto.HMACUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements IPaymentService {

  private final VNPAYConfig vnPayConfig;
  private final MomoConfig momoConfig;
  private final ZaloPayConfig zaloPayConfig;

  public VNPayResponse createVnPayPayment(HttpServletRequest request) {
    long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
    String bankCode = request.getParameter("bankCode");
    Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
    vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
    if (bankCode != null && !bankCode.isEmpty()) {
      vnpParamsMap.put("vnp_BankCode", bankCode);
    }
    vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
    String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
    String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
    String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
    queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
    String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

    return new VNPayResponse("ok", "success", paymentUrl);
  }


  //momo
  public String createPaymentRequest(String amount) {
    try {
      // Generate requestId and orderId
      String requestId = momoConfig.getPARTNER_CODE() + new Date().getTime();
      String orderId = requestId;
      String orderInfo = "SN Mobile";
      String extraData = "";

      // Generate raw signature
      String rawSignature = String.format(
          "accessKey=%s&amount=%s&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
          momoConfig.getACCESS_KEY(), amount, extraData, momoConfig.getIPN_URL(), orderId,
          orderInfo, momoConfig.getPARTNER_CODE(), momoConfig.getREDIRECT_URL(),
          requestId, momoConfig.getREQUEST_TYPE());

      // Sign with HMAC SHA256
      String signature = signHmacSHA256(rawSignature, momoConfig.getSECRET_KEY());

      JSONObject requestBody = new JSONObject();
      requestBody.put("partnerCode", momoConfig.getPARTNER_CODE());
      requestBody.put("accessKey", momoConfig.getACCESS_KEY());
      requestBody.put("requestId", requestId);
      requestBody.put("amount", amount);
      requestBody.put("orderId", orderId);
      requestBody.put("orderInfo", orderInfo);
      requestBody.put("redirectUrl", momoConfig.getREDIRECT_URL());
      requestBody.put("ipnUrl", momoConfig.getIPN_URL());
      requestBody.put("extraData", extraData);
      requestBody.put("requestType", momoConfig.getREQUEST_TYPE());
      requestBody.put("signature", signature);
      requestBody.put("lang", "en");

      CloseableHttpClient httpClient = HttpClients.createDefault();
      HttpPost httpPost = new HttpPost("https://test-payment.momo.vn/v2/gateway/api/create");
      httpPost.setHeader("Content-Type", "application/json");
      httpPost.setEntity(new StringEntity(requestBody.toString(), StandardCharsets.UTF_8));

      try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
        StringBuilder result = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
          result.append(line);
        }
        return result.toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
      return "{\"error\": \"Failed to create payment request: " + e.getMessage() + "\"}";
    }
  }

  // HMAC SHA256 signing method
  private static String signHmacSHA256(String data, String key) {
      try {
          Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
          SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
          hmacSHA256.init(secretKey);
          byte[] hash = hmacSHA256.doFinal(data.getBytes(StandardCharsets.UTF_8));
          StringBuilder hexString = new StringBuilder();
          for (byte b : hash) {
              String hex = Integer.toHexString(0xff & b);
              if (hex.length() == 1) {
                  hexString.append('0');
              }
              hexString.append(hex);
          }
          return hexString.toString();
      } catch (Exception e) {
          throw new HmacSigningException("Lỗi khi ký HMAC SHA256", e);
      }
  }


    @Override
  public String checkPaymentStatus(String orderId) {
    try {
      String requestId = momoConfig.getPARTNER_CODE() + new Date().getTime();
      String rawSignature = String.format(
          "accessKey=%s&orderId=%s&partnerCode=%s&requestId=%s",
          momoConfig.getACCESS_KEY(), orderId, momoConfig.getPARTNER_CODE(), requestId);
      String signature = signHmacSHA256(rawSignature, momoConfig.getSECRET_KEY());

      JSONObject requestBody = new JSONObject();
      requestBody.put("partnerCode", momoConfig.getPARTNER_CODE());
      requestBody.put("accessKey", momoConfig.getACCESS_KEY());
      requestBody.put("requestId", requestId);
      requestBody.put("orderId", orderId);
      requestBody.put("signature", signature);
      requestBody.put("lang", "en");

      CloseableHttpClient httpClient = HttpClients.createDefault();
      HttpPost httpPost = new HttpPost("https://test-payment.momo.vn/v2/gateway/api/query");
      httpPost.setHeader("Content-Type", "application/json");
      httpPost.setEntity(new StringEntity(requestBody.toString(), StandardCharsets.UTF_8));

      try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
        StringBuilder result = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
          result.append(line);
        }
        return result.toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
      return "{\"error\": \"Failed to check payment status: " + e.getMessage() + "\"}";
    }
  }

  // Zalopay

  private static String getCurrentTimeString(String format) {
    Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
    SimpleDateFormat fmt = new SimpleDateFormat(format);
    fmt.setCalendar(cal);
    return fmt.format(cal.getTimeInMillis());
  }


  @Override
  public String createOrder(Map<String, Object> orderRequest) {
    Random rand = new Random();
    int randomId = rand.nextInt(1000000);

    Object amount = orderRequest.get("amount");
    if (amount == null) {
      return "{\"error\": \"Amount is required\"}";
    }

    JSONObject embeddata = new JSONObject();
    embeddata.put("redirecturl", "http://localhost:3000/success");
    Map<String, Object> order = new HashMap<>();
    order.put("app_id", zaloPayConfig.getAppId());
    order.put("app_trans_id", getCurrentTimeString("yyMMdd") + "_" + randomId);
    order.put("app_time", System.currentTimeMillis());
    order.put("app_user", "user123");
    order.put("amount", amount);
    order.put("description", "SN Mobile - Payment for the order #" + randomId);
    order.put("bank_code", "");
    order.put("item", "[{}]");
    order.put("embed_data", embeddata.toString());
    order.put("callback_url",
        "https://9cbc-2405-4803-c860-45d0-a9ba-5d84-9e59-fb4b.ngrok-free.app/api/zalopay/callback");

    String data =
        order.get("app_id") + "|" + order.get("app_trans_id") + "|" + order.get("app_user") + "|"
            + order.get("amount") + "|" + order.get("app_time") + "|" + order.get("embed_data")
            + "|"
            + order.get("item");

    String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, zaloPayConfig.getKey1(), data);
    order.put("mac", mac);
    try (CloseableHttpClient client = HttpClients.createDefault()) {
      HttpPost post = new HttpPost(zaloPayConfig.getEndPoint());
      List<NameValuePair> params = new ArrayList<>();
      for (Map.Entry<String, Object> entry : order.entrySet()) {
        params.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
      }
      post.setEntity(new UrlEncodedFormEntity(params));
      try (CloseableHttpResponse response = client.execute(post)) {
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(response.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
          resultJsonStr.append(line);
        }
        return resultJsonStr.toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
      return "{\"error\": \"Failed to create order: " + e.getMessage() + "\"}";
    }
  }


  @Override
  public String getOrderStatus(String appTransId) {
    String data = zaloPayConfig.getAppId() + "|" + appTransId + "|" + zaloPayConfig.getKey1();
    String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, zaloPayConfig.getKey1(), data);

    try (CloseableHttpClient client = HttpClients.createDefault()) {
      HttpPost post = new HttpPost(zaloPayConfig.getOrderstatus());

      List<NameValuePair> params = new ArrayList<>();
      params.add(new BasicNameValuePair("app_id", zaloPayConfig.getAppId()));
      params.add(new BasicNameValuePair("app_trans_id", appTransId));
      params.add(new BasicNameValuePair("mac", mac));

      post.setEntity(new UrlEncodedFormEntity(params));

      try (CloseableHttpResponse response = client.execute(post)) {
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(response.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
          resultJsonStr.append(line);
        }

        return resultJsonStr.toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
      return "{\"error\": \"Failed to get order status: " + e.getMessage() + "\"}";
    }
  }


}
