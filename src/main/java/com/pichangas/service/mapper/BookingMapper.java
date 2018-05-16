package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.BookingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Booking and its DTO BookingDTO.
 */
@Mapper(componentModel = "spring", uses = {FieldMapper.class, ScheduleMapper.class, ClientFinalMapper.class})
public interface BookingMapper extends EntityMapper<BookingDTO, Booking> {

    @Mapping(source = "field.id", target = "fieldId")
    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "clientFinal.id", target = "clientFinalId")
    BookingDTO toDto(Booking booking);

    @Mapping(source = "fieldId", target = "field")
    @Mapping(source = "scheduleId", target = "schedule")
    @Mapping(source = "clientFinalId", target = "clientFinal")
    Booking toEntity(BookingDTO bookingDTO);

    default Booking fromId(Long id) {
        if (id == null) {
            return null;
        }
        Booking booking = new Booking();
        booking.setId(id);
        return booking;
    }
}
