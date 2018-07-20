package com.pichangas.repository;

import com.pichangas.domain.Booking;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;


/**
 * Spring Data JPA repository for the Booking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByField_Id(Long idField);

    List<Booking> findAllByField_IdAndStartDateBetween(Long idField, ZonedDateTime startDate1, ZonedDateTime startDate2);

    List<Booking> findAllByStartDateBetweenAndEndDateBetween(ZonedDateTime startDate, ZonedDateTime endDate, ZonedDateTime startDate1, ZonedDateTime endDate1);
}
