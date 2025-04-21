package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.ImageDto;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadService {

  ImageDto uploadImage(MultipartFile file) throws IOException;

  void deleteImage(String publicId);
}
