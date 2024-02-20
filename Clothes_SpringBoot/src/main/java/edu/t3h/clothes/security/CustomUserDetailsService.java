package edu.t3h.clothes.security;

import edu.t3h.clothes.entity.RoleEntity;
import edu.t3h.clothes.entity.UserEntity;
import edu.t3h.clothes.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    public UserEntityRepository userEntityRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userEntityRepository.findByUsername(username);

        if (userEntity != null){
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    userEntity.getUsername(),
                    userEntity.getPassword(),
                    convertStrToAuthor(userEntity.getRoleEntities())
            );
            return userDetails;
        }else {
            throw new UsernameNotFoundException("Invalid user with username!");
        }
    }

    private Collection<? extends GrantedAuthority> convertStrToAuthor(Collection<RoleEntity> roles){
//        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
        return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

}
