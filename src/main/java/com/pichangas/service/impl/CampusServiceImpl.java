package com.pichangas.service.impl;

import com.pichangas.service.CampusService;
import com.pichangas.domain.Campus;
import com.pichangas.repository.CampusRepository;
import com.pichangas.service.dto.CampusDTO;
import com.pichangas.service.mapper.CampusMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Campus.
 */
@Service
@Transactional
public class CampusServiceImpl implements CampusService {

    private final Logger log = LoggerFactory.getLogger(CampusServiceImpl.class);

    private final CampusRepository campusRepository;

    private final CampusMapper campusMapper;

    public CampusServiceImpl(CampusRepository campusRepository, CampusMapper campusMapper) {
        this.campusRepository = campusRepository;
        this.campusMapper = campusMapper;
    }

    /**
     * Save a campus.
     *
     * @param campusDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CampusDTO save(CampusDTO campusDTO) {
        log.debug("Request to save Campus : {}", campusDTO);
        Campus campus = campusMapper.toEntity(campusDTO);
        campus = campusRepository.save(campus);
        return campusMapper.toDto(campus);
    }

    /**
     * Get all the campuses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CampusDTO> findAll() {
        log.debug("Request to get all Campuses");
        return campusRepository.findAllWithEagerRelationships().stream()
            .map(campusMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the Campus with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<CampusDTO> findAllWithEagerRelationships(Pageable pageable) {
        return campusRepository.findAllWithEagerRelationships(pageable).map(campusMapper::toDto);
    }
    

    /**
     * Get all the campuses by id client.
     *
     * @return the list of entities
     */
    @Override
    public List<CampusDTO> findAllByClient(Long id) {
        log.debug("Request to get all Campuses by client");
        return campusRepository.findAllByClient_Id(id).stream()
            .map(campusMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one campus by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CampusDTO> findOne(Long id) {
        log.debug("Request to get Campus : {}", id);
        return campusRepository.findOneWithEagerRelationships(id)
            .map(campusMapper::toDto);
    }

    /**
     * Delete the campus by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Campus : {}", id);
        campusRepository.deleteById(id);
    }
}
