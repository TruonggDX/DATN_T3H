package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "producer")
@Data
public class ProducerEntity extends AbstractEntity {

  @Column(name = "code")
  private String code;
  @Column(name = "name")
  private String name;
  @Column(name = "address")
  private String address;
  @Column(name = "phone")
  private String phone;

}
