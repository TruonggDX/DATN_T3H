package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class ImageProductDTO {
    private Long id;
    private String url;
    private Long productId;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ImageProductDTO() {
    }

    public ImageProductDTO(Long id, String url) {
        this.id = id;
        this.url = url;
    }
}
