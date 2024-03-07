package edu.t3h.clothes.model.dto;

import lombok.Data;

@Data
public class SizeDTO {
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SizeDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public SizeDTO() {
    }
}
