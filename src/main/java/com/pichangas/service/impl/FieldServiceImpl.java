package com.pichangas.service.impl;

import com.pichangas.repository.BookingRepository;
import com.pichangas.service.FieldService;
import com.pichangas.domain.Field;
import com.pichangas.repository.FieldRepository;
import com.pichangas.service.dto.FieldDTO;
import com.pichangas.service.dto.FieldFilterDTO;
import com.pichangas.service.mapper.BookingMapper;
import com.pichangas.service.mapper.FieldMapper;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


import java.util.Optional;
/**
 * Service Implementation for managing Field.
 */
@Service
@Transactional
public class FieldServiceImpl implements FieldService {

    private final Logger log = LoggerFactory.getLogger(FieldServiceImpl.class);

    private final FieldRepository fieldRepository;

    private final BookingRepository bookingRepository;

    private final FieldMapper fieldMapper;

    private final BookingMapper bookingMapper;

    public FieldServiceImpl(FieldRepository fieldRepository, BookingRepository bookingRepository,
                            FieldMapper fieldMapper, BookingMapper bookingMapper) {
        this.fieldRepository = fieldRepository;
        this.bookingRepository = bookingRepository;
        this.fieldMapper = fieldMapper;
        this.bookingMapper = bookingMapper;
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
    public Optional<FieldDTO> findOne(Long id) {
        log.debug("Request to get Field : {}", id);
        return fieldRepository.findById(id)
            .map(fieldMapper::toDto);
    }

    /**
     * Delete the field by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Field : {}", id);
        fieldRepository.deleteById(id);
    }

    /**
     * Get all the fields by campus and filter.
     *
     * @param fieldFilterDTO filters for get the fields
     * @return the list of entities
     */
    @Override
    public List<FieldDTO> findAllByCampus(FieldFilterDTO fieldFilterDTO) {

        DateTime dateTime = new DateTime(fieldFilterDTO.getDate());
        List<FieldDTO> list = fieldRepository.findAllByCampus_Id(fieldFilterDTO.getIdCampus())
            .stream()
            .map(fieldMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

        for (FieldDTO fieldDTO : list){
            fieldDTO.setBookingsDTO(bookingRepository
                .findAllByField_IdAndStartDateBetween(fieldFilterDTO.getIdCampus(),
                    ZonedDateTime.ofInstant(dateTime.withTime(0,0,0,0).toDate().toInstant(), ZoneId.systemDefault()),
                    ZonedDateTime.ofInstant(dateTime.withTime(23,59,59,0).toDate().toInstant(), ZoneId.systemDefault()))
                .stream()
                .map(bookingMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new)));
        }

        return list;
    }
}
