package com.pichangas.service;

import com.pichangas.service.dto.ClientFinalDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ClientFinal.
 */
public interface ClientFinalService {

    /**
     * Save a clientFinal.
     *
     * @param clientFinalDTO the entity to save
     * @return the persisted entity
     */
    ClientFinalDTO save(ClientFinalDTO clientFinalDTO);

    /**
     * Get all the clientFinals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ClientFinalDTO> findAll(Pageable pageable);

    /**
     * Get the "id" clientFinal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ClientFinalDTO findOne(Long id);

    /**
     * Delete the "id" clientFinal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
