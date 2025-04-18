package edu.t3h.clothes.utils;

import java.util.Random;

public class GenarateCode {
  public static String generateAccountCode() {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    Random random = new Random();
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 7; i++) {
      sb.append(characters.charAt(random.nextInt(characters.length())));
    }
    return sb.toString();
  }
}
