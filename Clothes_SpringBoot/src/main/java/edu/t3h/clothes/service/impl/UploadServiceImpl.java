package edu.t3h.clothes.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import edu.t3h.clothes.exception.ErrorCloudinary;
import edu.t3h.clothes.model.dto.ImageDto;
import edu.t3h.clothes.service.IUploadService;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
@Data
public class UploadServiceImpl implements IUploadService {

  private final Cloudinary cloudinary;

  private String publicId;


  @Override
  public ImageDto uploadImage(MultipartFile file) throws IOException {
    if (file.getOriginalFilename() == null) {
      return null;
    }
    String publicValue = generatePublicValue(file.getOriginalFilename());
    File fileUpload = convert(file);
    var uploadResult = cloudinary.uploader().upload(fileUpload,
        ObjectUtils.asMap(
            publicId, publicValue,
            "width", 290,
            "height", 210,
            "crop", "fill"
        ));
    cleanDisk(fileUpload);
    ImageDto imageDTO = new ImageDto();
    imageDTO.setUrl(uploadResult.get("url").toString());
    imageDTO.setPublicId(uploadResult.get("public_id").toString());
    imageDTO.setType(file.getContentType());
    return imageDTO;
  }

  @Override
  public List<ImageDto> uploadImages(List<MultipartFile> files) {
    List<ImageDto> imageDtoList = new ArrayList<>();
    for (MultipartFile file : files) {
      try {
        if (file.getOriginalFilename() == null) {
          continue;
        }
        String publicValue = generatePublicValue(file.getOriginalFilename());
        File fileUpload = convert(file);
        var uploadResult = cloudinary.uploader().upload(fileUpload,
            ObjectUtils.asMap(
                publicId, publicValue,
                "width", 290,
                "height", 210,
                "crop", "fill"
            ));
        cleanDisk(fileUpload);
        ImageDto imageDTO = new ImageDto();
        imageDTO.setUrl(uploadResult.get("url").toString());
        imageDTO.setPublicId(uploadResult.get("public_id").toString());
        imageDTO.setType(file.getContentType());
        imageDtoList.add(imageDTO);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    return imageDtoList;
  }


  @Override
  public void deleteImage(String publicId) {
    try {
      Map<String, String> params = ObjectUtils.asMap("public_id", publicId);
      cloudinary.uploader().destroy(publicId, params);
    } catch (Exception e) {
      throw new ErrorCloudinary("Lỗi khi xóa hình ảnh từ Cloudinary");
    }
  }

  private File convert(MultipartFile file) throws IOException {
    assert file.getOriginalFilename() != null;
    File convFile = new File(
        StringUtils.join(generatePublicValue(file.getOriginalFilename()),
            getFileName(file.getOriginalFilename())[1]));
    try (InputStream is = file.getInputStream()) {
      Files.copy(is, convFile.toPath());
    }
    return convFile;
  }

  private void cleanDisk(File file) {
    try {
      Path filePath = file.toPath();
      Files.delete(filePath);
    } catch (IOException e) {
      throw new ErrorCloudinary("Clean Disk error");
    }
  }

  public String generatePublicValue(String originalName) {
    String fileName = getFileName(originalName)[0];
    return StringUtils.join(UUID.randomUUID().toString(), "_", fileName);
  }

  public String[] getFileName(String originalName) {
    return originalName.split("\\.");
  }
}
