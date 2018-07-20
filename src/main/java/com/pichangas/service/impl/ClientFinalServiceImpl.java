package com.pichangas.service.impl;

import com.pichangas.service.ClientFinalService;
import com.pichangas.domain.ClientFinal;
import com.pichangas.repository.ClientFinalRepository;
import com.pichangas.service.dto.ClientFinalDTO;
import com.pichangas.service.mapper.ClientFinalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing ClientFinal.
 */
@Service
@Transactional
public class ClientFinalServiceImpl implements ClientFinalService {

    private final Logger log = LoggerFactory.getLogger(ClientFinalServiceImpl.class);

    private final ClientFinalRepository clientFinalRepository;

    private final ClientFinalMapper clientFinalMapper;

    public ClientFinalServiceImpl(ClientFinalRepository clientFinalRepository, ClientFinalMapper clientFinalMapper) {
        this.clientFinalRepository = clientFinalRepository;
        this.clientFinalMapper = clientFinalMapper;
    }

    /**
     * Save a clientFinal.
     *
     * @param clientFinalDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClientFinalDTO save(ClientFinalDTO clientFinalDTO) {
        log.debug("Request to save ClientFinal : {}", clientFinalDTO);
        ClientFinal clientFinal = clientFinalMapper.toEntity(clientFinalDTO);
        clientFinal = clientFinalRepository.save(clientFinal);
        return clientFinalMapper.toDto(clientFinal);
    }

    /**
     * Get all the clientFinals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ClientFinalDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ClientFinals");
        return clientFinalRepository.findAll(pageable)
            .map(clientFinalMapper::toDto);
    }


    /**
     * Get one clientFinal by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ClientFinalDTO> findOne(Long id) {
        log.debug("Request to get ClientFinal : {}", id);
        return clientFinalRepository.findById(id)
            .map(clientFinalMapper::toDto);
    }

    /**
     * Delete the clientFinal by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ClientFinal : {}", id);
        clientFinalRepository.deleteById(id);
    }
}
