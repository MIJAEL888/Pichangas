package com.pichangas.service.impl;

import com.pichangas.service.DistrictService;
import com.pichangas.domain.District;
import com.pichangas.repository.DistrictRepository;
import com.pichangas.service.dto.DistrictDTO;
import com.pichangas.service.mapper.DistrictMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing District.
 */
@Service
@Transactional
public class DistrictServiceImpl implements DistrictService {

    private final Logger log = LoggerFactory.getLogger(DistrictServiceImpl.class);

    private final DistrictRepository districtRepository;

    private final DistrictMapper districtMapper;

    public DistrictServiceImpl(DistrictRepository districtRepository, DistrictMapper districtMapper) {
        this.districtRepository = districtRepository;
        this.districtMapper = districtMapper;
    }

    /**
     * Save a district.
     *
     * @param districtDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DistrictDTO save(DistrictDTO districtDTO) {
        log.debug("Request to save District : {}", districtDTO);
        District district = districtMapper.toEntity(districtDTO);
        district = districtRepository.save(district);
        return districtMapper.toDto(district);
    }

    /**
     * Get all the districts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DistrictDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Districts");
        return districtRepository.findAll(pageable)
            .map(districtMapper::toDto);
    }

    /**
     * Get one district by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DistrictDTO findOne(Long id) {
        log.debug("Request to get District : {}", id);
        District district = districtRepository.findOne(id);
        return districtMapper.toDto(district);
    }

    /**
     * Delete the district by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete District : {}", id);
        districtRepository.delete(id);
    }
}