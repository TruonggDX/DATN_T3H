package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.AttributeValueDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IAttributeValueService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attribute-value")
public class ApiAttributeValue {

  private final IAttributeValueService iAttributeValueService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<AttributeValueDto>>> getAllAttributesValue(
      Pageable pageable) {
    ResponsePage<List<AttributeValueDto>> responsePage = iAttributeValueService.getAllAttributeValues(
        pageable);
    return ResponseEntity.ok(responsePage);
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<AttributeValueDto>> createAttribute(
      @RequestBody AttributeValueDto attributeValueDto) {
    BaseResponse<AttributeValueDto> response = iAttributeValueService.createAttributeValue(
        attributeValueDto);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<AttributeValueDto>> updateAttribute(@PathVariable Long id,
      @RequestBody AttributeValueDto attributeValueDto) {
    BaseResponse<AttributeValueDto> response = iAttributeValueService.updateAttributeValue(id,
        attributeValueDto);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<AttributeValueDto>> deleteAttribute(@PathVariable Long id) {
    BaseResponse<AttributeValueDto> response = iAttributeValueService.deleteAttributeValue(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findById/{id}")
  public ResponseEntity<BaseResponse<AttributeValueDto>> findById(@PathVariable Long id) {
    BaseResponse<AttributeValueDto> response = iAttributeValueService.getAttributeValue(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/findByCondition")
  public ResponseEntity<ResponsePage<List<AttributeValueDto>>> findByCondition(
      @RequestParam(value = "value") String value,
      @RequestParam(value = "attributeId", required = false) Long attributeId, Pageable pageable) {
    ResponsePage<List<AttributeValueDto>> response = iAttributeValueService.findByCondition(value,
        attributeId, pageable);
    return ResponseEntity.ok(response);
  }
}
