package com.pichangas.service;

import com.pichangas.service.dto.UserAppDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing UserApp.
 */
public interface UserAppService {

    /**
     * Save a userApp.
     *
     * @param userAppDTO the entity to save
     * @return the persisted entity
     */
    UserAppDTO save(UserAppDTO userAppDTO);

    /**
     * Get all the userApps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UserAppDTO> findAll(Pageable pageable);
    /**
     * Get all the UserAppDTO where ClientFinal is null.
     *
     * @return the list of entities
     */
    List<UserAppDTO> findAllWhereClientFinalIsNull();

    /**
     * Get the "id" userApp.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserAppDTO findOne(Long id);

    /**
     * Delete the "id" userApp.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
