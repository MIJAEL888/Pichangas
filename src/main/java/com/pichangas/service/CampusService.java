package com.pichangas.service;

import com.pichangas.service.dto.CampusDTO;
import java.util.List;

/**
 * Service Interface for managing Campus.
 */
public interface CampusService {

    /**
     * Save a campus.
     *
     * @param campusDTO the entity to save
     * @return the persisted entity
     */
    CampusDTO save(CampusDTO campusDTO);

    /**
     * Get all the campuses.
     *
     * @return the list of entities
     */
    List<CampusDTO> findAll();

    /**
     * Get the "id" campus.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CampusDTO findOne(Long id);

    /**
     * Delete the "id" campus.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
