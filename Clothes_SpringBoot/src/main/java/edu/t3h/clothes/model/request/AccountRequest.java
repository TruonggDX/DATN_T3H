package edu.t3h.clothes.model.request;

import java.util.Set;
import lombok.Data;

@Data
public class AccountRequest {

  private Long id;
  private String fullname;
  private String address;
  private String phone;
  private String birthday;
  private Set<Long> roleIds;
  private String imageUrl;
}
