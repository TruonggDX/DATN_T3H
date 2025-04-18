package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.model.dto.ProducerDto;
import org.springframework.stereotype.Component;

@Component
public class ProducerMapper {

  public ProducerDto toDto(ProducerEntity producerEntity) {
    ProducerDto producerDTO = new ProducerDto();
    producerDTO.setId(producerEntity.getId());
    producerDTO.setName(producerEntity.getName());
    producerDTO.setCode(producerEntity.getCode());
    producerDTO.setAddress(producerEntity.getAddress());
    producerDTO.setPhone(producerEntity.getPhone());
    return producerDTO;
  }

  public ProducerEntity toEntity(ProducerDto producerDTO) {
    ProducerEntity producerEntity = new ProducerEntity();
    producerEntity.setId(producerDTO.getId());
    producerEntity.setName(producerDTO.getName());
    producerEntity.setCode(producerDTO.getCode());
    producerEntity.setPhone(producerDTO.getPhone());
    producerEntity.setAddress(producerDTO.getAddress());
    return producerEntity;
  }
}
