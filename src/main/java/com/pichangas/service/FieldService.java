package com.pichangas.service;

import com.pichangas.service.dto.FieldDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Field.
 */
public interface FieldService {

    /**
     * Save a field.
     *
     * @param fieldDTO the entity to save
     * @return the persisted entity
     */
    FieldDTO save(FieldDTO fieldDTO);

    /**
     * Get all the fields.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FieldDTO> findAll(Pageable pageable);


    /**
     * Get the "id" field.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FieldDTO> findOne(Long id);

    /**
     * Delete the "id" field.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
