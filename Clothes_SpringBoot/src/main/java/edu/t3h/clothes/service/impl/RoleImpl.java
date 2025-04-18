package edu.t3h.clothes.service.impl;
import edu.t3h.clothes.repository.RoleRepository;
import edu.t3h.clothes.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleImpl implements IRoleService {
    private final RoleRepository roleRepository;

}
