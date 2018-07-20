package com.pichangas.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pichangas.service.ClientFinalService;
import com.pichangas.web.rest.errors.BadRequestAlertException;
import com.pichangas.web.rest.util.HeaderUtil;
import com.pichangas.web.rest.util.PaginationUtil;
import com.pichangas.service.dto.ClientFinalDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ClientFinal.
 */
@RestController
@RequestMapping("/api")
public class ClientFinalResource {

    private final Logger log = LoggerFactory.getLogger(ClientFinalResource.class);

    private static final String ENTITY_NAME = "clientFinal";

    private final ClientFinalService clientFinalService;

    public ClientFinalResource(ClientFinalService clientFinalService) {
        this.clientFinalService = clientFinalService;
    }

    /**
     * POST  /client-finals : Create a new clientFinal.
     *
     * @param clientFinalDTO the clientFinalDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clientFinalDTO, or with status 400 (Bad Request) if the clientFinal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-finals")
    @Timed
    public ResponseEntity<ClientFinalDTO> createClientFinal(@Valid @RequestBody ClientFinalDTO clientFinalDTO) throws URISyntaxException {
        log.debug("REST request to save ClientFinal : {}", clientFinalDTO);
        if (clientFinalDTO.getId() != null) {
            throw new BadRequestAlertException("A new clientFinal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientFinalDTO result = clientFinalService.save(clientFinalDTO);
        return ResponseEntity.created(new URI("/api/client-finals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /client-finals : Updates an existing clientFinal.
     *
     * @param clientFinalDTO the clientFinalDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clientFinalDTO,
     * or with status 400 (Bad Request) if the clientFinalDTO is not valid,
     * or with status 500 (Internal Server Error) if the clientFinalDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-finals")
    @Timed
    public ResponseEntity<ClientFinalDTO> updateClientFinal(@Valid @RequestBody ClientFinalDTO clientFinalDTO) throws URISyntaxException {
        log.debug("REST request to update ClientFinal : {}", clientFinalDTO);
        if (clientFinalDTO.getId() == null) {
            return createClientFinal(clientFinalDTO);
        }
        ClientFinalDTO result = clientFinalService.save(clientFinalDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clientFinalDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /client-finals : get all the clientFinals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of clientFinals in body
     */
    @GetMapping("/client-finals")
    @Timed
    public ResponseEntity<List<ClientFinalDTO>> getAllClientFinals(Pageable pageable) {
        log.debug("REST request to get a page of ClientFinals");
        Page<ClientFinalDTO> page = clientFinalService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/client-finals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /client-finals/:id : get the "id" clientFinal.
     *
     * @param id the id of the clientFinalDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clientFinalDTO, or with status 404 (Not Found)
     */
    @GetMapping("/client-finals/{id}")
    @Timed
    public ResponseEntity<ClientFinalDTO> getClientFinal(@PathVariable Long id) {
        log.debug("REST request to get ClientFinal : {}", id);
        ClientFinalDTO clientFinalDTO = clientFinalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clientFinalDTO));
    }

    /**
     * DELETE  /client-finals/:id : delete the "id" clientFinal.
     *
     * @param id the id of the clientFinalDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-finals/{id}")
    @Timed
    public ResponseEntity<Void> deleteClientFinal(@PathVariable Long id) {
        log.debug("REST request to delete ClientFinal : {}", id);
        clientFinalService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
