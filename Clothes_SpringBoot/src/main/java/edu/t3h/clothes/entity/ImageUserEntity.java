package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@Table(name = "image_user")
public class ImageUserEntity extends AbstractEntity{
    private String url;

}
