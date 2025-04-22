package edu.t3h.clothes.security.service;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.model.dto.AccountDto;
import edu.t3h.clothes.model.dto.RoleDto;
import edu.t3h.clothes.model.dto.auth.AuthDto;
import edu.t3h.clothes.repository.RoleRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@RequiredArgsConstructor
public class JwtService {

  @Value("${security.jwt.secret-key}")
  private String secretKey;
  @Value("${security.jwt.expiration-time}")
  private long jwtExpiration;
  private final RoleRepository roleRepository;
  private static final Logger log = LoggerFactory.getLogger(JwtService.class);

  public String generateToken(AccountDto accountDto) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", accountDto.getRoles()
        .stream()
        .map(RoleDto::getName)
        .collect(Collectors.toList()));
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(accountDto.getEmail())
        .setIssuer("DCB")
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
        .signWith(generateKey())
        .compact();
  }

  private SecretKey generateKey() {
    byte[] decode
        = Decoders.BASE64.decode(getSecretKey());

    return Keys.hmacShaKeyFor(decode);
  }

  public long getExpirationTime() {
    return jwtExpiration;
  }

  public String getSecretKey() {
    return secretKey;
  }

  public String extractUserName(String token) {
    return extractClaims(token, Claims::getSubject);
  }

  private <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
    Claims claims = extractClaims(token);
    return claimResolver.apply(claims);
  }

  private Claims extractClaims(String token) {
    return Jwts
        .parser()
        .verifyWith(generateKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String email = extractUserName(token);
    return email != null && email.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaims(token, Claims::getExpiration);
  }


  public AuthDto decodeToken() {
    try {
      HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
      String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
      if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
        log.warn("Authorization header không hợp lệ hoặc không tồn tại");
        return null;
      }

      String token = authorizationHeader.substring(7);
      Claims claims = Jwts.parser()
          .setSigningKey(generateKey())
          .build()
          .parseClaimsJws(token)
          .getBody();

      String email = claims.getSubject();
      Set<String> roles = new HashSet<>((List<String>) claims.get("roles"));
      AuthDto authDTO = new AuthDto();

      authDTO.setEmail(email);
      authDTO.setRoles(roles.stream()
          .map(roleName -> {
            RoleEntity roleEntity = roleRepository.findByName(roleName);
            return new RoleDto(roleEntity.getId(), roleEntity.getCode(), roleEntity.getName());
          })
          .collect(Collectors.toSet()));

      return authDTO;

    } catch (Exception e) {
      log.error("Lỗi khi decode token: {}", e.getMessage()); // Ghi log lỗi
      return null; // Trả về null để không làm gián đoạn luồng xử lý
    }
  }

}
