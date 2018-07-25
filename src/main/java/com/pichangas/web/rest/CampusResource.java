package com.pichangas.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pichangas.service.CampusService;
import com.pichangas.web.rest.errors.BadRequestAlertException;
import com.pichangas.web.rest.util.HeaderUtil;
import com.pichangas.service.dto.CampusDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Campus.
 */
@RestController
@RequestMapping("/api")
public class CampusResource {

    private final Logger log = LoggerFactory.getLogger(CampusResource.class);

    private static final String ENTITY_NAME = "campus";

    private final CampusService campusService;

    public CampusResource(CampusService campusService) {
        this.campusService = campusService;
    }

    /**
     * POST  /campuses : Create a new campus.
     *
     * @param campusDTO the campusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campusDTO, or with status 400 (Bad Request) if the campus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campuses")
    @Timed
    public ResponseEntity<CampusDTO> createCampus(@Valid @RequestBody CampusDTO campusDTO) throws URISyntaxException {
        log.debug("REST request to save Campus : {}", campusDTO);
        if (campusDTO.getId() != null) {
            throw new BadRequestAlertException("A new campus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampusDTO result = campusService.save(campusDTO);
        return ResponseEntity.created(new URI("/api/campuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campuses : Updates an existing campus.
     *
     * @param campusDTO the campusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campusDTO,
     * or with status 400 (Bad Request) if the campusDTO is not valid,
     * or with status 500 (Internal Server Error) if the campusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campuses")
    @Timed
    public ResponseEntity<CampusDTO> updateCampus(@Valid @RequestBody CampusDTO campusDTO) throws URISyntaxException {
        log.debug("REST request to update Campus : {}", campusDTO);
        if (campusDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CampusDTO result = campusService.save(campusDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campuses : get all the campuses.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of campuses in body
     */
    @GetMapping("/campuses")
    @Timed
    public List<CampusDTO> getAllCampuses(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Campuses");
        return campusService.findAll();
    }

    /**
     * GET  /campuses/client/:id : get all the campuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of campuses in body
     */
    @GetMapping("/campuses/client/{id}")
    @Timed
    public ResponseEntity<List<CampusDTO>> getAllCampusesByClient(@PathVariable Long id) {
        log.debug("REST request to get all Campuses");
        return new ResponseEntity<>(campusService.findAllByClient(id), HttpStatus.OK);
    }

    /**
     * GET  /campuses/:id : get the "id" campus.
     *
     * @param id the id of the campusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/campuses/{id}")
    @Timed
    public ResponseEntity<CampusDTO> getCampus(@PathVariable Long id) {
        log.debug("REST request to get Campus : {}", id);
        Optional<CampusDTO> campusDTO = campusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(campusDTO);
    }

    /**
     * DELETE  /campuses/:id : delete the "id" campus.
     *
     * @param id the id of the campusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampus(@PathVariable Long id) {
        log.debug("REST request to delete Campus : {}", id);
        campusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
