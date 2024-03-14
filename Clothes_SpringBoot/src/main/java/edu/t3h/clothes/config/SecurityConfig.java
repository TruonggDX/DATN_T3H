
package edu.t3h.clothes.config;

import edu.t3h.clothes.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder builder){
        try {
            builder.userDetailsService(customUserDetailsService)
                    .passwordEncoder(passwordEncoder());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()

                .authorizeHttpRequests((author) -> author.requestMatchers("/","/login").permitAll()
                        .requestMatchers("/admin/**").hasAnyRole("ADMIN")
                                .requestMatchers("/producer/**").hasAnyRole("ADMIN")
                                .requestMatchers("/color/**").hasAnyRole("ADMIN")
                                .requestMatchers("/api/user/**").hasAnyRole("ADMIN")
                                .requestMatchers("/role/**").hasAnyRole("ADMIN")
                                .requestMatchers("/user/**").hasAnyRole("USER")
                                .requestMatchers("/category/**").hasAnyRole("ADMIN")
                                .requestMatchers("/home/shop/**").hasAnyRole("USER")
//                                .requestMatchers("/categoryshop/**").hasAnyRole("USER")
                                .requestMatchers("/process-after-login").hasAnyRole(new String[]{"ADMIN", "USER"})
                )
                .formLogin(form ->
                        form.
                                loginPage("/login") // GET
                                .loginProcessingUrl("/authentication") // POST
                                .defaultSuccessUrl("/process-after-login")
                                .failureUrl("/login").permitAll()
                )
                .logout(logout -> logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login"));
        return http.build();
    }

    @Bean
    WebSecurityCustomizer webSecurityCustomizer(){
        return (web -> web.ignoring()
                .requestMatchers("/static/**","/auth/**")
        );
    }


    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("admin"));
    }
}
