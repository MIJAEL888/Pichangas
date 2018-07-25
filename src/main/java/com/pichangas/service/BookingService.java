package com.pichangas.service;

import com.pichangas.service.dto.BookingDTO;

import java.util.List;
import java.util.Optional;

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
    BookingDTO save(BookingDTO bookingDTO) throws Exception;

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save
     * @return the persisted entity
     */
    BookingDTO validate(BookingDTO bookingDTO) throws Exception;

    /**
     * Get all the bookings.
     *
     * @return the list of entities
     */
    List<BookingDTO> findAll();


    /**
     * Get the "id" booking.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BookingDTO> findOne(Long id);

    /**
     * Get the "id" booking.
     *
     * @param idField the id of the entity Field
     * @return the entity
     */
    List<BookingDTO> findByField(Long idField);

    /**
     * Delete the "id" booking.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
