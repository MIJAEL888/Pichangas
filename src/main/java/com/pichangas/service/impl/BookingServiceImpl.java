package com.pichangas.service.impl;

import com.pichangas.service.BookingService;
import com.pichangas.domain.Booking;
import com.pichangas.repository.BookingRepository;
import com.pichangas.service.dto.BookingDTO;
import com.pichangas.service.mapper.BookingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Locale;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Booking.
 */
@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;

    private final BookingMapper bookingMapper;

    private final MessageSource messageSource;

    public BookingServiceImpl(BookingRepository bookingRepository, BookingMapper bookingMapper, MessageSource messageSource) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.messageSource = messageSource;
    }

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BookingDTO save(BookingDTO bookingDTO) throws Exception {
        log.debug("Request to save Booking : {}", bookingDTO);
        Booking booking = bookingMapper.toEntity(bookingDTO);
        if (isAvailable(booking.getStartDate(), booking.getEndDate()))
            booking = bookingRepository.save(booking);
        else
            throw new Exception(messageSource.getMessage("error.booking.available", null, Locale.getDefault()));

        return bookingMapper.toDto(booking);
    }

    /**
     * Validate a booking.
     *
     * @param bookingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BookingDTO validate(BookingDTO bookingDTO) throws Exception {
        log.debug("Request to save Booking : {}", bookingDTO);
        Booking booking = bookingMapper.toEntity(bookingDTO);
        if (isAvailable(booking.getStartDate(), booking.getEndDate()))
           return bookingDTO;
        else
            throw new Exception(messageSource.getMessage("error.booking.available", null, Locale.getDefault()));
    }

    private boolean isAvailable(ZonedDateTime startDate, ZonedDateTime endDate){
       return bookingRepository.findAllByStartDateBetweenAndEndDateBetween(startDate, endDate, startDate, endDate).isEmpty();
    }
    /**
     * Get all the bookings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> findAll() {
        log.debug("Request to get all Bookings");
        return bookingRepository.findAll().stream()
            .map(bookingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one booking by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BookingDTO> findOne(Long id) {
        log.debug("Request to get Booking : {}", id);
        return bookingRepository.findById(id)
            .map(bookingMapper::toDto);
    }

    /**
     * Get the "id" booking.
     *
     * @param idField the id of the entity Field
     * @return the entity
     */
    @Override
    public List<BookingDTO> findByField(Long idField) {
        return bookingRepository.findAllByField_Id(idField).stream()
            .map(bookingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Delete the booking by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Booking : {}", id);
        bookingRepository.deleteById(id);
    }
}
