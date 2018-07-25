package com.pichangas.service;

import com.pichangas.service.dto.ScheduleDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Schedule.
 */
public interface ScheduleService {

    /**
     * Save a schedule.
     *
     * @param scheduleDTO the entity to save
     * @return the persisted entity
     */
    ScheduleDTO save(ScheduleDTO scheduleDTO);

    /**
     * Get all the schedules.
     *
     * @return the list of entities
     */
    List<ScheduleDTO> findAll();


    /**
     * Get the "id" schedule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ScheduleDTO> findOne(Long id);

    /**
     * Delete the "id" schedule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
