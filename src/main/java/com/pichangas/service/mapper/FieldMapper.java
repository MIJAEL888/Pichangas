package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.FieldDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Field and its DTO FieldDTO.
 */
@Mapper(componentModel = "spring", uses = {CampusMapper.class})
public interface FieldMapper extends EntityMapper<FieldDTO, Field> {

    @Mapping(source = "campus.id", target = "campusId")
    FieldDTO toDto(Field field);

    @Mapping(source = "campusId", target = "campus")
    @Mapping(target = "schedules", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    Field toEntity(FieldDTO fieldDTO);

    default Field fromId(Long id) {
        if (id == null) {
            return null;
        }
        Field field = new Field();
        field.setId(id);
        return field;
    }
}
