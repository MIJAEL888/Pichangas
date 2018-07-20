package com.pichangas.web.rest;

import com.pichangas.PichangasApp;

import com.pichangas.domain.Field;
import com.pichangas.repository.FieldRepository;
import com.pichangas.service.FieldService;
import com.pichangas.service.dto.FieldDTO;
import com.pichangas.service.mapper.FieldMapper;
import com.pichangas.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pichangas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pichangas.domain.enumeration.TypeField;
import com.pichangas.domain.enumeration.TypeSport;
import com.pichangas.domain.enumeration.StateField;
/**
 * Test class for the FieldResource REST controller.
 *
 * @see FieldResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PichangasApp.class)
public class FieldResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_PLAYERS = 1;
    private static final Integer UPDATED_NUM_PLAYERS = 2;

    private static final TypeField DEFAULT_TYPE_FIELD = TypeField.GRASS;
    private static final TypeField UPDATED_TYPE_FIELD = TypeField.CONCRET;

    private static final TypeSport DEFAULT_TYPE_SPORT = TypeSport.FUTBOL;
    private static final TypeSport UPDATED_TYPE_SPORT = TypeSport.VOLLEYBALL;

    private static final StateField DEFAULT_STATE = StateField.MAINTENANCE;
    private static final StateField UPDATED_STATE = StateField.AVAILABLE;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private FieldMapper fieldMapper;

    @Autowired
    private FieldService fieldService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFieldMockMvc;

    private Field field;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldResource fieldResource = new FieldResource(fieldService);
        this.restFieldMockMvc = MockMvcBuilders.standaloneSetup(fieldResource)
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
    public static Field createEntity(EntityManager em) {
        Field field = new Field()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .comment(DEFAULT_COMMENT)
            .numPlayers(DEFAULT_NUM_PLAYERS)
            .typeField(DEFAULT_TYPE_FIELD)
            .typeSport(DEFAULT_TYPE_SPORT)
            .state(DEFAULT_STATE);
        return field;
    }

    @Before
    public void initTest() {
        field = createEntity(em);
    }

    @Test
    @Transactional
    public void createField() throws Exception {
        int databaseSizeBeforeCreate = fieldRepository.findAll().size();

        // Create the Field
        FieldDTO fieldDTO = fieldMapper.toDto(field);
        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isCreated());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeCreate + 1);
        Field testField = fieldList.get(fieldList.size() - 1);
        assertThat(testField.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testField.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testField.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testField.getNumPlayers()).isEqualTo(DEFAULT_NUM_PLAYERS);
        assertThat(testField.getTypeField()).isEqualTo(DEFAULT_TYPE_FIELD);
        assertThat(testField.getTypeSport()).isEqualTo(DEFAULT_TYPE_SPORT);
        assertThat(testField.getState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createFieldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldRepository.findAll().size();

        // Create the Field with an existing ID
        field.setId(1L);
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldRepository.findAll().size();
        // set the field null
        field.setName(null);

        // Create the Field, which fails.
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isBadRequest());

        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumPlayersIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldRepository.findAll().size();
        // set the field null
        field.setNumPlayers(null);

        // Create the Field, which fails.
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isBadRequest());

        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeFieldIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldRepository.findAll().size();
        // set the field null
        field.setTypeField(null);

        // Create the Field, which fails.
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isBadRequest());

        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeSportIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldRepository.findAll().size();
        // set the field null
        field.setTypeSport(null);

        // Create the Field, which fails.
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isBadRequest());

        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldRepository.findAll().size();
        // set the field null
        field.setState(null);

        // Create the Field, which fails.
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        restFieldMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isBadRequest());

        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFields() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);

        // Get all the fieldList
        restFieldMockMvc.perform(get("/api/fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(field.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].numPlayers").value(hasItem(DEFAULT_NUM_PLAYERS)))
            .andExpect(jsonPath("$.[*].typeField").value(hasItem(DEFAULT_TYPE_FIELD.toString())))
            .andExpect(jsonPath("$.[*].typeSport").value(hasItem(DEFAULT_TYPE_SPORT.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())));
    }

    @Test
    @Transactional
    public void getField() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);

        // Get the field
        restFieldMockMvc.perform(get("/api/fields/{id}", field.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(field.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.numPlayers").value(DEFAULT_NUM_PLAYERS))
            .andExpect(jsonPath("$.typeField").value(DEFAULT_TYPE_FIELD.toString()))
            .andExpect(jsonPath("$.typeSport").value(DEFAULT_TYPE_SPORT.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingField() throws Exception {
        // Get the field
        restFieldMockMvc.perform(get("/api/fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateField() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);
        int databaseSizeBeforeUpdate = fieldRepository.findAll().size();

        // Update the field
        Field updatedField = fieldRepository.findOne(field.getId());
        // Disconnect from session so that the updates on updatedField are not directly saved in db
        em.detach(updatedField);
        updatedField
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .comment(UPDATED_COMMENT)
            .numPlayers(UPDATED_NUM_PLAYERS)
            .typeField(UPDATED_TYPE_FIELD)
            .typeSport(UPDATED_TYPE_SPORT)
            .state(UPDATED_STATE);
        FieldDTO fieldDTO = fieldMapper.toDto(updatedField);

        restFieldMockMvc.perform(put("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isOk());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeUpdate);
        Field testField = fieldList.get(fieldList.size() - 1);
        assertThat(testField.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testField.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testField.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testField.getNumPlayers()).isEqualTo(UPDATED_NUM_PLAYERS);
        assertThat(testField.getTypeField()).isEqualTo(UPDATED_TYPE_FIELD);
        assertThat(testField.getTypeSport()).isEqualTo(UPDATED_TYPE_SPORT);
        assertThat(testField.getState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingField() throws Exception {
        int databaseSizeBeforeUpdate = fieldRepository.findAll().size();

        // Create the Field
        FieldDTO fieldDTO = fieldMapper.toDto(field);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFieldMockMvc.perform(put("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldDTO)))
            .andExpect(status().isCreated());

        // Validate the Field in the database
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteField() throws Exception {
        // Initialize the database
        fieldRepository.saveAndFlush(field);
        int databaseSizeBeforeDelete = fieldRepository.findAll().size();

        // Get the field
        restFieldMockMvc.perform(delete("/api/fields/{id}", field.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Field> fieldList = fieldRepository.findAll();
        assertThat(fieldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Field.class);
        Field field1 = new Field();
        field1.setId(1L);
        Field field2 = new Field();
        field2.setId(field1.getId());
        assertThat(field1).isEqualTo(field2);
        field2.setId(2L);
        assertThat(field1).isNotEqualTo(field2);
        field1.setId(null);
        assertThat(field1).isNotEqualTo(field2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldDTO.class);
        FieldDTO fieldDTO1 = new FieldDTO();
        fieldDTO1.setId(1L);
        FieldDTO fieldDTO2 = new FieldDTO();
        assertThat(fieldDTO1).isNotEqualTo(fieldDTO2);
        fieldDTO2.setId(fieldDTO1.getId());
        assertThat(fieldDTO1).isEqualTo(fieldDTO2);
        fieldDTO2.setId(2L);
        assertThat(fieldDTO1).isNotEqualTo(fieldDTO2);
        fieldDTO1.setId(null);
        assertThat(fieldDTO1).isNotEqualTo(fieldDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(fieldMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(fieldMapper.fromId(null)).isNull();
    }
}
