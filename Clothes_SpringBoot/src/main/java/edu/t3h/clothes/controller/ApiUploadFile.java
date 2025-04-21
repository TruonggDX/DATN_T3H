package edu.t3h.clothes.controller;


import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.service.IUploadService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class ApiUploadFile {

  private final IUploadService uploadImageFile;

  @PostMapping("/image")
  public ImageDto uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
    return uploadImageFile.uploadImage(file);
  }
}
