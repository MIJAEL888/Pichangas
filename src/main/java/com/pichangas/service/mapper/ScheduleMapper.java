package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.ScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Schedule and its DTO ScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {FieldMapper.class})
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {

    @Mapping(source = "field.id", target = "fieldId")
    ScheduleDTO toDto(Schedule schedule);

    @Mapping(source = "fieldId", target = "field")
    @Mapping(target = "bookings", ignore = true)
    Schedule toEntity(ScheduleDTO scheduleDTO);

    default Schedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
}
