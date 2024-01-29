package edu.t3h.clothes.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        return httpSecurity
//                .csrf(csrf -> csrf.disable())
//                .cors(cors -> cors.disable())
//                .authorizeHttpRequests(http -> http
//                        .requestMatchers("/login","/auth/**").permitAll()
//                        .anyRequest().authenticated()).logout(httpLogout -> httpLogout
//                        .logoutUrl("/logout")
//                        .logoutSuccessUrl("/login"))
//                .formLogin(httpLogin ->
//                        httpLogin.loginPage("/login")
//                                .usernameParameter("username")
//                                .permitAll()
//                                .successHandler((request, response, authentication) -> {
////                                    for (GrantedAuthority authority : authentication.getAuthorities()) {
//////                                        if (authority.getAuthority().equals("USER")) {
////                                            response.sendRedirect("/user");
////                                            return;
//////                                        }
////                                    }
//                                    response.sendRedirect("/user");
//                                })
//                )
//
//
//                .httpBasic()
//                .and()
//                .build();
//    }

}
