package com.pichangas.service.impl;

import com.pichangas.service.FieldService;
import com.pichangas.domain.Field;
import com.pichangas.repository.FieldRepository;
import com.pichangas.service.dto.FieldDTO;
import com.pichangas.service.mapper.FieldMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Field.
 */
@Service
@Transactional
public class FieldServiceImpl implements FieldService {

    private final Logger log = LoggerFactory.getLogger(FieldServiceImpl.class);

    private final FieldRepository fieldRepository;

    private final FieldMapper fieldMapper;

    public FieldServiceImpl(FieldRepository fieldRepository, FieldMapper fieldMapper) {
        this.fieldRepository = fieldRepository;
        this.fieldMapper = fieldMapper;
    }

    /**
     * Save a field.
     *
     * @param fieldDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FieldDTO save(FieldDTO fieldDTO) {
        log.debug("Request to save Field : {}", fieldDTO);
        Field field = fieldMapper.toEntity(fieldDTO);
        field = fieldRepository.save(field);
        return fieldMapper.toDto(field);
    }

    /**
     * Get all the fields.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FieldDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Fields");
        return fieldRepository.findAll(pageable)
            .map(fieldMapper::toDto);
    }

    /**
     * Get all the fields.
     *
     * @param id campus id
     * @return the list of entities
     */
    @Override
    public List<FieldDTO> findAll(Long id) {
        log.debug("Request to get all Fields by campus");
        return fieldRepository.findAllByCampus_Id(id).stream()
            .map(fieldMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one field by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FieldDTO findOne(Long id) {
        log.debug("Request to get Field : {}", id);
        Field field = fieldRepository.findOne(id);
        return fieldMapper.toDto(field);
    }

    /**
     * Delete the field by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Field : {}", id);
        fieldRepository.delete(id);
    }
}
