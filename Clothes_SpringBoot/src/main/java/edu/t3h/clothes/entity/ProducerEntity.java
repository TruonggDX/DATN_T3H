package edu.t3h.clothes.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "producer")
public class ProducerEntity extends AbstractEntity{
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;

    public ProducerEntity() {
    }

    public ProducerEntity(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
