package edu.t3h.clothes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "review")
public class ReviewEntity extends AbstractEntity{

}
