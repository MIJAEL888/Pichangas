package com.pichangas.web.rest;

import com.pichangas.PichangasApp;

import com.pichangas.domain.Campus;
import com.pichangas.repository.CampusRepository;
import com.pichangas.service.CampusService;
import com.pichangas.service.dto.CampusDTO;
import com.pichangas.service.mapper.CampusMapper;
import com.pichangas.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.pichangas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CampusResource REST controller.
 *
 * @see CampusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PichangasApp.class)
public class CampusResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_OPEN_TIME = 0;
    private static final Integer UPDATED_OPEN_TIME = 1;

    private static final Integer DEFAULT_CLOSE_TIME = 0;
    private static final Integer UPDATED_CLOSE_TIME = 1;

    private static final String DEFAULT_ADITIONAL = "AAAAAAAAAA";
    private static final String UPDATED_ADITIONAL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESSS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESSS = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final String DEFAULT_COD_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_COD_POSTAL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final String DEFAULT_RATING = "AAAAAAAAAA";
    private static final String UPDATED_RATING = "BBBBBBBBBB";

    @Autowired
    private CampusRepository campusRepository;
    @Mock
    private CampusRepository campusRepositoryMock;

    @Autowired
    private CampusMapper campusMapper;
    
    @Mock
    private CampusService campusServiceMock;

    @Autowired
    private CampusService campusService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampusMockMvc;

    private Campus campus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampusResource campusResource = new CampusResource(campusService);
        this.restCampusMockMvc = MockMvcBuilders.standaloneSetup(campusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Campus createEntity(EntityManager em) {
        Campus campus = new Campus()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .comment(DEFAULT_COMMENT)
            .openTime(DEFAULT_OPEN_TIME)
            .closeTime(DEFAULT_CLOSE_TIME)
            .aditional(DEFAULT_ADITIONAL)
            .addresss(DEFAULT_ADDRESSS)
            .reference(DEFAULT_REFERENCE)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .codPostal(DEFAULT_COD_POSTAL)
            .status(DEFAULT_STATUS)
            .rating(DEFAULT_RATING);
        return campus;
    }

    @Before
    public void initTest() {
        campus = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampus() throws Exception {
        int databaseSizeBeforeCreate = campusRepository.findAll().size();

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);
        restCampusMockMvc.perform(post("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isCreated());

        // Validate the Campus in the database
        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeCreate + 1);
        Campus testCampus = campusList.get(campusList.size() - 1);
        assertThat(testCampus.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCampus.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCampus.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testCampus.getOpenTime()).isEqualTo(DEFAULT_OPEN_TIME);
        assertThat(testCampus.getCloseTime()).isEqualTo(DEFAULT_CLOSE_TIME);
        assertThat(testCampus.getAditional()).isEqualTo(DEFAULT_ADITIONAL);
        assertThat(testCampus.getAddresss()).isEqualTo(DEFAULT_ADDRESSS);
        assertThat(testCampus.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testCampus.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testCampus.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testCampus.getCodPostal()).isEqualTo(DEFAULT_COD_POSTAL);
        assertThat(testCampus.isStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testCampus.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createCampusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campusRepository.findAll().size();

        // Create the Campus with an existing ID
        campus.setId(1L);
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampusMockMvc.perform(post("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = campusRepository.findAll().size();
        // set the field null
        campus.setName(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc.perform(post("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = campusRepository.findAll().size();
        // set the field null
        campus.setOpenTime(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc.perform(post("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCloseTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = campusRepository.findAll().size();
        // set the field null
        campus.setCloseTime(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc.perform(post("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddresssIsRequired() throws Exception {
        int databaseSizeBeforeTest = campusRepository.findAll().size();
        // set the field null
        campus.setAddresss(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc.perform(post("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCampuses() throws Exception {
        // Initialize the database
        campusRepository.saveAndFlush(campus);

        // Get all the campusList
        restCampusMockMvc.perform(get("/api/campuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campus.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].openTime").value(hasItem(DEFAULT_OPEN_TIME)))
            .andExpect(jsonPath("$.[*].closeTime").value(hasItem(DEFAULT_CLOSE_TIME)))
            .andExpect(jsonPath("$.[*].aditional").value(hasItem(DEFAULT_ADITIONAL.toString())))
            .andExpect(jsonPath("$.[*].addresss").value(hasItem(DEFAULT_ADDRESSS.toString())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].codPostal").value(hasItem(DEFAULT_COD_POSTAL.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.toString())));
    }
    
    public void getAllCampusesWithEagerRelationshipsIsEnabled() throws Exception {
        CampusResource campusResource = new CampusResource(campusServiceMock);
        when(campusServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCampusMockMvc = MockMvcBuilders.standaloneSetup(campusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCampusMockMvc.perform(get("/api/campuses?eagerload=true"))
        .andExpect(status().isOk());

        verify(campusServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllCampusesWithEagerRelationshipsIsNotEnabled() throws Exception {
        CampusResource campusResource = new CampusResource(campusServiceMock);
            when(campusServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCampusMockMvc = MockMvcBuilders.standaloneSetup(campusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCampusMockMvc.perform(get("/api/campuses?eagerload=true"))
        .andExpect(status().isOk());

            verify(campusServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCampus() throws Exception {
        // Initialize the database
        campusRepository.saveAndFlush(campus);

        // Get the campus
        restCampusMockMvc.perform(get("/api/campuses/{id}", campus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campus.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.openTime").value(DEFAULT_OPEN_TIME))
            .andExpect(jsonPath("$.closeTime").value(DEFAULT_CLOSE_TIME))
            .andExpect(jsonPath("$.aditional").value(DEFAULT_ADITIONAL.toString()))
            .andExpect(jsonPath("$.addresss").value(DEFAULT_ADDRESSS.toString()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.codPostal").value(DEFAULT_COD_POSTAL.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCampus() throws Exception {
        // Get the campus
        restCampusMockMvc.perform(get("/api/campuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampus() throws Exception {
        // Initialize the database
        campusRepository.saveAndFlush(campus);

        int databaseSizeBeforeUpdate = campusRepository.findAll().size();

        // Update the campus
        Campus updatedCampus = campusRepository.findById(campus.getId()).get();
        // Disconnect from session so that the updates on updatedCampus are not directly saved in db
        em.detach(updatedCampus);
        updatedCampus
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .comment(UPDATED_COMMENT)
            .openTime(UPDATED_OPEN_TIME)
            .closeTime(UPDATED_CLOSE_TIME)
            .aditional(UPDATED_ADITIONAL)
            .addresss(UPDATED_ADDRESSS)
            .reference(UPDATED_REFERENCE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .codPostal(UPDATED_COD_POSTAL)
            .status(UPDATED_STATUS)
            .rating(UPDATED_RATING);
        CampusDTO campusDTO = campusMapper.toDto(updatedCampus);

        restCampusMockMvc.perform(put("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isOk());

        // Validate the Campus in the database
        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeUpdate);
        Campus testCampus = campusList.get(campusList.size() - 1);
        assertThat(testCampus.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCampus.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCampus.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testCampus.getOpenTime()).isEqualTo(UPDATED_OPEN_TIME);
        assertThat(testCampus.getCloseTime()).isEqualTo(UPDATED_CLOSE_TIME);
        assertThat(testCampus.getAditional()).isEqualTo(UPDATED_ADITIONAL);
        assertThat(testCampus.getAddresss()).isEqualTo(UPDATED_ADDRESSS);
        assertThat(testCampus.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testCampus.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testCampus.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testCampus.getCodPostal()).isEqualTo(UPDATED_COD_POSTAL);
        assertThat(testCampus.isStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCampus.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingCampus() throws Exception {
        int databaseSizeBeforeUpdate = campusRepository.findAll().size();

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampusMockMvc.perform(put("/api/campuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCampus() throws Exception {
        // Initialize the database
        campusRepository.saveAndFlush(campus);

        int databaseSizeBeforeDelete = campusRepository.findAll().size();

        // Get the campus
        restCampusMockMvc.perform(delete("/api/campuses/{id}", campus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Campus> campusList = campusRepository.findAll();
        assertThat(campusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Campus.class);
        Campus campus1 = new Campus();
        campus1.setId(1L);
        Campus campus2 = new Campus();
        campus2.setId(campus1.getId());
        assertThat(campus1).isEqualTo(campus2);
        campus2.setId(2L);
        assertThat(campus1).isNotEqualTo(campus2);
        campus1.setId(null);
        assertThat(campus1).isNotEqualTo(campus2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampusDTO.class);
        CampusDTO campusDTO1 = new CampusDTO();
        campusDTO1.setId(1L);
        CampusDTO campusDTO2 = new CampusDTO();
        assertThat(campusDTO1).isNotEqualTo(campusDTO2);
        campusDTO2.setId(campusDTO1.getId());
        assertThat(campusDTO1).isEqualTo(campusDTO2);
        campusDTO2.setId(2L);
        assertThat(campusDTO1).isNotEqualTo(campusDTO2);
        campusDTO1.setId(null);
        assertThat(campusDTO1).isNotEqualTo(campusDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(campusMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(campusMapper.fromId(null)).isNull();
    }
}
