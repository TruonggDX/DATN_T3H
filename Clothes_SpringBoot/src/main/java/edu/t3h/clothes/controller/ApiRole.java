package edu.t3h.clothes.controller;

import edu.t3h.clothes.model.dto.RoleDto;
import edu.t3h.clothes.model.response.BaseResponse;
import edu.t3h.clothes.model.response.ResponsePage;
import edu.t3h.clothes.service.IRoleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
public class ApiRole {

  private final IRoleService iRoleService;

  @GetMapping("/list")
  public ResponseEntity<ResponsePage<List<RoleDto>>> getAll(Pageable pageable) {
    return ResponseEntity.ok(iRoleService.getAllRoles(pageable));
  }

  @PostMapping("/create")
  public ResponseEntity<BaseResponse<RoleDto>> createRole(@RequestBody RoleDto roleDto) {
    BaseResponse<RoleDto> response = iRoleService.addRole(roleDto);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<BaseResponse<RoleDto>> deleteRole(@PathVariable Long id) {
    BaseResponse<RoleDto> response = iRoleService.deleteRole(id);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<BaseResponse<RoleDto>> updateRole(@PathVariable Long id,
      @RequestBody RoleDto roleDto) {
    BaseResponse<RoleDto> response = iRoleService.updateRole(id, roleDto);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/search/{id}")
  public ResponseEntity<BaseResponse<RoleDto>> getId(@PathVariable Long id) {
    BaseResponse<RoleDto> roleDto = iRoleService.findById(id);
    return ResponseEntity.ok(roleDto);
  }

  @GetMapping("/searchByCondition")
  public ResponseEntity<ResponsePage<List<RoleDto>>> searchUsersByCondition(
      @RequestParam(value = "code") String code, @RequestParam(value = "name") String name,
      Pageable pageable) {
    ResponsePage<List<RoleDto>> cateDto = iRoleService.findByCondition(code, name, pageable);
    return ResponseEntity.ok(cateDto);
  }

}
