package edu.t3h.clothes.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Data
public class ProductDTO {
    private Long id;

    private String code;

    private String name;

    private String material;

    private String  description;

    private Integer quantity;

    private Double price;

    private Float import_price;

    private LocalDateTime created_date;

    private String created_by;

    private LocalDateTime modified_date;

    private String modified_by;


    private String category;

    private String size;

    private String producer;

    private String color;

    private Long categoryId;
    private List<Long> colorId;
    private List<Long> sizeId;
    private Long producerId;

    private List<String> imagesColor = new ArrayList<>();

    public ProductDTO(Long id, String code, String name){
        this.id = id;
        this.code = code;
        this.name = name;
    }


    private List<ImageProductDTO> imageDTOs = new ArrayList<>();
    public void addImageDTO(ImageProductDTO imageDTO){
        this.imageDTOs.add(imageDTO);
    }

    public ProductDTO(){}



}
