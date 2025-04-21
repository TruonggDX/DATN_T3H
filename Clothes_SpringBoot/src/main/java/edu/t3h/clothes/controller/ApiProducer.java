package edu.t3h.clothes.controller;


import edu.t3h.clothes.model.dto.ProducerDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IProducerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/producer")
@RequiredArgsConstructor
public class ApiProducer {

  private final IProducerService producerService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<ProducerDto>>> getAll(Pageable pageable) {
    ResponsePage<List<ProducerDto>> responsePage = producerService.getAll(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<ProducerDto>> createProducer(
      @RequestBody ProducerDto producerDTO) {
    BaseResponse<ProducerDto> response = producerService.creatProducer(producerDTO);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<ProducerDto>> deleteProducer(@PathVariable Long id) {
    BaseResponse<ProducerDto> response = producerService.deleteProducer(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<ProducerDto>> updateProducer(@PathVariable Long id,
      @RequestBody ProducerDto producerDTO) {
    BaseResponse<ProducerDto> response = producerService.updateProducer(id, producerDTO);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/search/{id}")
  public ResponseEntity<BaseResponse<ProducerDto>> getId(@PathVariable Long id) {
    BaseResponse<ProducerDto> producerDTO = producerService.findByProducerById(id);
    return ResponseEntity.ok(producerDTO);
  }

  @GetMapping("/searchByCondition")
  public ResponseEntity<ResponsePage<List<ProducerDto>>> searchUsersByCondition(@RequestParam(value = "name") String name,@RequestParam(value = "code") String code, @RequestParam(value = "address") String address, @RequestParam(value = "phone") String phone, Pageable pageable) {
    ResponsePage<List<ProducerDto>> producer = producerService.searchProducerByCondition(name, code, address, phone, pageable);
    return ResponseEntity.ok(producer);
  }
}
