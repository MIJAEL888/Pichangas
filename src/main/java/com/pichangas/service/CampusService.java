package com.pichangas.service;

import com.pichangas.service.dto.CampusDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

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
     * Get all the Campus with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<CampusDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get all the campuses by client.
     *
     * @return the list of entities
     */
    List<CampusDTO> findAllByClient(Long id);

    /**
     * Get the "id" campus.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CampusDTO> findOne(Long id);

    /**
     * Delete the "id" campus.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
