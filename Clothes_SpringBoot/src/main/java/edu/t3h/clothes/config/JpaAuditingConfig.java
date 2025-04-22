package edu.t3h.clothes.config;

import java.util.Optional;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class JpaAuditingConfig {

  @Bean
  public AuditorAware<String> auditorAware() {
    return () -> {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication == null ||
          !authentication.isAuthenticated() ||
          "anonymousUser".equals(authentication.getPrincipal())) {
        return Optional.of("anonymousUser");
      }
      Object principal = authentication.getPrincipal();
      if (principal instanceof String) {
        return Optional.of((String) principal);
      } else if (principal instanceof UserDetails) {
        return Optional.of(((UserDetails) principal).getUsername());
      }
      return Optional.of("unknownUser");
    };
  }
}
