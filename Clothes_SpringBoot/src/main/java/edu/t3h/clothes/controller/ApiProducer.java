package edu.t3h.clothes.controller;


import edu.t3h.clothes.model.dto.ProducerDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IProducerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

  @PostMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<ProducerDto>> deleteProducer(@PathVariable Long id) {
    BaseResponse<ProducerDto> response = producerService.deleteProducer(id);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/update/{id}")
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

  @GetMapping("/searchByCondition/{condition}")
  public ResponseEntity<BaseResponse<Page<ProducerDto>>> searchUsersByCondition(
      @PathVariable String condition,
      @RequestParam(name = "page", required = false, defaultValue = "0") int page,
      @RequestParam(name = "size", required = false, defaultValue = "10") int size) {

    BaseResponse<Page<ProducerDto>> prodto = producerService.searchProducerByCondition(condition,
        page, size);
    return ResponseEntity.ok(prodto);
  }
}
