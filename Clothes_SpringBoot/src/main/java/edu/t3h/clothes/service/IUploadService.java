package edu.t3h.clothes.service;

import edu.t3h.clothes.model.dto.ImageDto;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadService {

  ImageDto uploadImage(MultipartFile file) throws IOException;

  List<ImageDto> uploadImages(List<MultipartFile> files);

  void deleteImage(String publicId);
}
