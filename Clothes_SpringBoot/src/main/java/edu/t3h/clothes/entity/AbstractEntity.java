package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "created_date")
  @CreatedDate
  private LocalDateTime createdDate;
  @Column(name = "created_by")
  @CreatedBy
  private String createdBy;
  @Column(name = "modified_date")
  @LastModifiedDate
  private LocalDateTime modifiedDate;
  @Column(name = "modified_by")
  @LastModifiedBy
  private String modifiedBy;
  @Column(name = "deleted", columnDefinition = "tinyint(1) default 0")
  private Boolean deleted;
}
