package edu.t3h.clothes.mapper;

import edu.t3h.clothes.entity.ProducerEntity;
import edu.t3h.clothes.model.dto.ProducerDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProducerMapper {

  ProducerDto toDto(ProducerEntity producerEntity);

  ProducerEntity toEntity(ProducerDto producerDto);
}
