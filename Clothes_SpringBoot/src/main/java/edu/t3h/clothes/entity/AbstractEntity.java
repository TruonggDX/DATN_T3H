package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public abstract class AbstractEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "created_date")
  private LocalDateTime createdDate;
  @Column(name = "created_by")
  private String createdBy;
  @Column(name = "modified_date")
  private LocalDateTime modifiedDate;
  @Column(name = "modified_by")
  private String modifiedBy;
  @Column(name = "deleted", columnDefinition = "tinyint(1) default 0")
  private Boolean deleted;
}
