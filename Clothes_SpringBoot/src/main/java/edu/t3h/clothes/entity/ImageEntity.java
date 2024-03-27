package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name = "image_user")
public class ImageEntity extends AbstractEntity{
    private String url;

//    @OneToMany(mappedBy = "imageuser", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private List<UserEntity> userEntities;
}
