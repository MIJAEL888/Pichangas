package com.pichangas.service;

import com.pichangas.service.dto.BookingDTO;
import java.util.List;

/**
 * Service Interface for managing Booking.
 */
public interface BookingService {

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save
     * @return the persisted entity
     */
    BookingDTO save(BookingDTO bookingDTO);

    /**
     * Get all the bookings.
     *
     * @return the list of entities
     */
    List<BookingDTO> findAll();

    /**
     * Get all the bookings.
     *
     * @param id the id of the Field
     * @return the list of entities
     */
    List<BookingDTO> findAllByField(Long id);

    /**
     * Get the "id" booking.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BookingDTO findOne(Long id);

    /**
     * Delete the "id" booking.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
