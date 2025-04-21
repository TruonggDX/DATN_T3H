package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.AttributeDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IAttributeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attribute")
public class ApiAttribute {

  private final IAttributeService attributeService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<AttributeDto>>> getAllAttributes(Pageable pageable) {
    ResponsePage<List<AttributeDto>> responsePage = attributeService.getAllAttributes(pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<AttributeDto>> createAttribute(
      @RequestBody AttributeDto attributeDto) {
    BaseResponse<AttributeDto> response = attributeService.createAttribute(attributeDto);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<AttributeDto>> updateAttribute(@PathVariable Long id,
      @RequestBody AttributeDto attributeDto) {
    BaseResponse<AttributeDto> response = attributeService.updateAttribute(id, attributeDto);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<AttributeDto>> deleteAttribute(@PathVariable Long id) {
    BaseResponse<AttributeDto> response = attributeService.deleteAttribute(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<AttributeDto>> findById(@PathVariable Long id) {
    BaseResponse<AttributeDto> response = attributeService.getAttribute(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findByName/{name}")
  public ResponseEntity<BaseResponse<List<AttributeDto>>> findByName(@PathVariable String name) {
    BaseResponse<List<AttributeDto>> response = attributeService.findByName(name);
    return ResponseEntity.ok(response);
  }
}
