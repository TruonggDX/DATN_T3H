package edu.t3h.clothes.service;


import edu.t3h.clothes.model.dto.CartDto;
import edu.t3h.clothes.model.response.ResponsePage;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ICartService {

  ResponsePage<List<CartDto>> getAllCarts(Pageable pageable);

}
