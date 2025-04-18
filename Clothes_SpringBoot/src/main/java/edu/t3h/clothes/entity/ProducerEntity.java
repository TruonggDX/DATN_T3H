package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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

  @OneToMany(mappedBy = "producerEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private List<ProductEntity> productEntities;

}
