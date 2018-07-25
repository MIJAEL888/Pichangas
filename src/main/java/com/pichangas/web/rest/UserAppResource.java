package com.pichangas.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pichangas.service.UserAppService;
import com.pichangas.web.rest.errors.BadRequestAlertException;
import com.pichangas.web.rest.util.HeaderUtil;
import com.pichangas.web.rest.util.PaginationUtil;
import com.pichangas.service.dto.UserAppDTO;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing UserApp.
 */
@RestController
@RequestMapping("/api")
public class UserAppResource {

    private final Logger log = LoggerFactory.getLogger(UserAppResource.class);

    private static final String ENTITY_NAME = "userApp";

    private final UserAppService userAppService;

    public UserAppResource(UserAppService userAppService) {
        this.userAppService = userAppService;
    }

    /**
     * POST  /user-apps : Create a new userApp.
     *
     * @param userAppDTO the userAppDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userAppDTO, or with status 400 (Bad Request) if the userApp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-apps")
    @Timed
    public ResponseEntity<UserAppDTO> createUserApp(@Valid @RequestBody UserAppDTO userAppDTO) throws URISyntaxException {
        log.debug("REST request to save UserApp : {}", userAppDTO);
        if (userAppDTO.getId() != null) {
            throw new BadRequestAlertException("A new userApp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserAppDTO result = userAppService.save(userAppDTO);
        return ResponseEntity.created(new URI("/api/user-apps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-apps : Updates an existing userApp.
     *
     * @param userAppDTO the userAppDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userAppDTO,
     * or with status 400 (Bad Request) if the userAppDTO is not valid,
     * or with status 500 (Internal Server Error) if the userAppDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-apps")
    @Timed
    public ResponseEntity<UserAppDTO> updateUserApp(@Valid @RequestBody UserAppDTO userAppDTO) throws URISyntaxException {
        log.debug("REST request to update UserApp : {}", userAppDTO);
        if (userAppDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserAppDTO result = userAppService.save(userAppDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userAppDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-apps : get all the userApps.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of userApps in body
     */
    @GetMapping("/user-apps")
    @Timed
    public ResponseEntity<List<UserAppDTO>> getAllUserApps(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("clientfinal-is-null".equals(filter)) {
            log.debug("REST request to get all UserApps where clientFinal is null");
            return new ResponseEntity<>(userAppService.findAllWhereClientFinalIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of UserApps");
        Page<UserAppDTO> page = userAppService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-apps");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-apps/:id : get the "id" userApp.
     *
     * @param id the id of the userAppDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userAppDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-apps/{id}")
    @Timed
    public ResponseEntity<UserAppDTO> getUserApp(@PathVariable Long id) {
        log.debug("REST request to get UserApp : {}", id);
        Optional<UserAppDTO> userAppDTO = userAppService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userAppDTO);
    }

    /**
     * DELETE  /user-apps/:id : delete the "id" userApp.
     *
     * @param id the id of the userAppDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-apps/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserApp(@PathVariable Long id) {
        log.debug("REST request to delete UserApp : {}", id);
        userAppService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
