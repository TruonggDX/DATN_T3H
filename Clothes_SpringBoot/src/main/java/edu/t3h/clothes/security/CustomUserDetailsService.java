package edu.t3h.clothes.security;


import edu.t3h.clothes.entity.AccountEntity;
import edu.t3h.clothes.repository.AccountRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsService implements UserDetailsService {

  private final AccountRepository accountRepository;

  public CustomUserDetailsService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    AccountEntity accountEntity = accountRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("UserEntity not found"));

    return new CustomUserDetails(accountEntity);
  }

}
