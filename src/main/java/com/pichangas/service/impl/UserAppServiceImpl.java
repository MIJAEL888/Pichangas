package com.pichangas.service.impl;

import com.pichangas.service.UserAppService;
import com.pichangas.domain.UserApp;
import com.pichangas.repository.UserAppRepository;
import com.pichangas.service.dto.UserAppDTO;
import com.pichangas.service.mapper.UserAppMapper;
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
import java.util.stream.StreamSupport;
/**
 * Service Implementation for managing UserApp.
 */
@Service
@Transactional
public class UserAppServiceImpl implements UserAppService {

    private final Logger log = LoggerFactory.getLogger(UserAppServiceImpl.class);

    private final UserAppRepository userAppRepository;

    private final UserAppMapper userAppMapper;

    public UserAppServiceImpl(UserAppRepository userAppRepository, UserAppMapper userAppMapper) {
        this.userAppRepository = userAppRepository;
        this.userAppMapper = userAppMapper;
    }

    /**
     * Save a userApp.
     *
     * @param userAppDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserAppDTO save(UserAppDTO userAppDTO) {
        log.debug("Request to save UserApp : {}", userAppDTO);
        UserApp userApp = userAppMapper.toEntity(userAppDTO);
        userApp = userAppRepository.save(userApp);
        return userAppMapper.toDto(userApp);
    }

    /**
     * Get all the userApps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserAppDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserApps");
        return userAppRepository.findAll(pageable)
            .map(userAppMapper::toDto);
    }



    /**
     *  get all the userApps where ClientFinal is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<UserAppDTO> findAllWhereClientFinalIsNull() {
        log.debug("Request to get all userApps where ClientFinal is null");
        return StreamSupport
            .stream(userAppRepository.findAll().spliterator(), false)
            .filter(userApp -> userApp.getClientFinal() == null)
            .map(userAppMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userApp by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserAppDTO> findOne(Long id) {
        log.debug("Request to get UserApp : {}", id);
        return userAppRepository.findById(id)
            .map(userAppMapper::toDto);
    }

    /**
     * Delete the userApp by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserApp : {}", id);
        userAppRepository.deleteById(id);
    }
}
