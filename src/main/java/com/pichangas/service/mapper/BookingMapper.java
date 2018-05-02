package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.BookingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Booking and its DTO BookingDTO.
 */
@Mapper(componentModel = "spring", uses = {FieldMapper.class, ScheduleMapper.class, ClientFinalMapper.class})
public interface BookingMapper extends EntityMapper<BookingDTO, Booking> {

    @Mapping(source = "field", target = "fieldDto")
    @Mapping(source = "schedule", target = "scheduleDto")
    @Mapping(source = "clientFinal", target = "clientFinalDto")
    BookingDTO toDto(Booking booking);

    @Mapping(source = "fieldDto", target = "field")
    @Mapping(source = "scheduleDto", target = "schedule")
    @Mapping(source = "clientFinalDto", target = "clientFinal")
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
