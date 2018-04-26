package com.pichangas.web.rest;

import com.pichangas.PichangasApp;

import com.pichangas.domain.ClientFinal;
import com.pichangas.repository.ClientFinalRepository;
import com.pichangas.service.ClientFinalService;
import com.pichangas.service.dto.ClientFinalDTO;
import com.pichangas.service.mapper.ClientFinalMapper;
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

/**
 * Test class for the ClientFinalResource REST controller.
 *
 * @see ClientFinalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PichangasApp.class)
public class ClientFinalResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SUR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_DOCUMENT = "AAAAAAAAAA";
    private static final String UPDATED_NUM_DOCUMENT = "BBBBBBBBBB";

    @Autowired
    private ClientFinalRepository clientFinalRepository;

    @Autowired
    private ClientFinalMapper clientFinalMapper;

    @Autowired
    private ClientFinalService clientFinalService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClientFinalMockMvc;

    private ClientFinal clientFinal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientFinalResource clientFinalResource = new ClientFinalResource(clientFinalService);
        this.restClientFinalMockMvc = MockMvcBuilders.standaloneSetup(clientFinalResource)
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
    public static ClientFinal createEntity(EntityManager em) {
        ClientFinal clientFinal = new ClientFinal()
            .name(DEFAULT_NAME)
            .surName(DEFAULT_SUR_NAME)
            .mobile(DEFAULT_MOBILE)
            .email(DEFAULT_EMAIL)
            .numDocument(DEFAULT_NUM_DOCUMENT);
        return clientFinal;
    }

    @Before
    public void initTest() {
        clientFinal = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientFinal() throws Exception {
        int databaseSizeBeforeCreate = clientFinalRepository.findAll().size();

        // Create the ClientFinal
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);
        restClientFinalMockMvc.perform(post("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isCreated());

        // Validate the ClientFinal in the database
        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeCreate + 1);
        ClientFinal testClientFinal = clientFinalList.get(clientFinalList.size() - 1);
        assertThat(testClientFinal.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testClientFinal.getSurName()).isEqualTo(DEFAULT_SUR_NAME);
        assertThat(testClientFinal.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testClientFinal.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testClientFinal.getNumDocument()).isEqualTo(DEFAULT_NUM_DOCUMENT);
    }

    @Test
    @Transactional
    public void createClientFinalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientFinalRepository.findAll().size();

        // Create the ClientFinal with an existing ID
        clientFinal.setId(1L);
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientFinalMockMvc.perform(post("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClientFinal in the database
        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientFinalRepository.findAll().size();
        // set the field null
        clientFinal.setName(null);

        // Create the ClientFinal, which fails.
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);

        restClientFinalMockMvc.perform(post("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isBadRequest());

        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientFinalRepository.findAll().size();
        // set the field null
        clientFinal.setSurName(null);

        // Create the ClientFinal, which fails.
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);

        restClientFinalMockMvc.perform(post("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isBadRequest());

        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMobileIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientFinalRepository.findAll().size();
        // set the field null
        clientFinal.setMobile(null);

        // Create the ClientFinal, which fails.
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);

        restClientFinalMockMvc.perform(post("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isBadRequest());

        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientFinalRepository.findAll().size();
        // set the field null
        clientFinal.setEmail(null);

        // Create the ClientFinal, which fails.
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);

        restClientFinalMockMvc.perform(post("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isBadRequest());

        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClientFinals() throws Exception {
        // Initialize the database
        clientFinalRepository.saveAndFlush(clientFinal);

        // Get all the clientFinalList
        restClientFinalMockMvc.perform(get("/api/client-finals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientFinal.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surName").value(hasItem(DEFAULT_SUR_NAME.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].numDocument").value(hasItem(DEFAULT_NUM_DOCUMENT.toString())));
    }

    @Test
    @Transactional
    public void getClientFinal() throws Exception {
        // Initialize the database
        clientFinalRepository.saveAndFlush(clientFinal);

        // Get the clientFinal
        restClientFinalMockMvc.perform(get("/api/client-finals/{id}", clientFinal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientFinal.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.surName").value(DEFAULT_SUR_NAME.toString()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.numDocument").value(DEFAULT_NUM_DOCUMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClientFinal() throws Exception {
        // Get the clientFinal
        restClientFinalMockMvc.perform(get("/api/client-finals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientFinal() throws Exception {
        // Initialize the database
        clientFinalRepository.saveAndFlush(clientFinal);
        int databaseSizeBeforeUpdate = clientFinalRepository.findAll().size();

        // Update the clientFinal
        ClientFinal updatedClientFinal = clientFinalRepository.findOne(clientFinal.getId());
        // Disconnect from session so that the updates on updatedClientFinal are not directly saved in db
        em.detach(updatedClientFinal);
        updatedClientFinal
            .name(UPDATED_NAME)
            .surName(UPDATED_SUR_NAME)
            .mobile(UPDATED_MOBILE)
            .email(UPDATED_EMAIL)
            .numDocument(UPDATED_NUM_DOCUMENT);
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(updatedClientFinal);

        restClientFinalMockMvc.perform(put("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isOk());

        // Validate the ClientFinal in the database
        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeUpdate);
        ClientFinal testClientFinal = clientFinalList.get(clientFinalList.size() - 1);
        assertThat(testClientFinal.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testClientFinal.getSurName()).isEqualTo(UPDATED_SUR_NAME);
        assertThat(testClientFinal.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testClientFinal.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testClientFinal.getNumDocument()).isEqualTo(UPDATED_NUM_DOCUMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingClientFinal() throws Exception {
        int databaseSizeBeforeUpdate = clientFinalRepository.findAll().size();

        // Create the ClientFinal
        ClientFinalDTO clientFinalDTO = clientFinalMapper.toDto(clientFinal);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClientFinalMockMvc.perform(put("/api/client-finals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientFinalDTO)))
            .andExpect(status().isCreated());

        // Validate the ClientFinal in the database
        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClientFinal() throws Exception {
        // Initialize the database
        clientFinalRepository.saveAndFlush(clientFinal);
        int databaseSizeBeforeDelete = clientFinalRepository.findAll().size();

        // Get the clientFinal
        restClientFinalMockMvc.perform(delete("/api/client-finals/{id}", clientFinal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClientFinal> clientFinalList = clientFinalRepository.findAll();
        assertThat(clientFinalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientFinal.class);
        ClientFinal clientFinal1 = new ClientFinal();
        clientFinal1.setId(1L);
        ClientFinal clientFinal2 = new ClientFinal();
        clientFinal2.setId(clientFinal1.getId());
        assertThat(clientFinal1).isEqualTo(clientFinal2);
        clientFinal2.setId(2L);
        assertThat(clientFinal1).isNotEqualTo(clientFinal2);
        clientFinal1.setId(null);
        assertThat(clientFinal1).isNotEqualTo(clientFinal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientFinalDTO.class);
        ClientFinalDTO clientFinalDTO1 = new ClientFinalDTO();
        clientFinalDTO1.setId(1L);
        ClientFinalDTO clientFinalDTO2 = new ClientFinalDTO();
        assertThat(clientFinalDTO1).isNotEqualTo(clientFinalDTO2);
        clientFinalDTO2.setId(clientFinalDTO1.getId());
        assertThat(clientFinalDTO1).isEqualTo(clientFinalDTO2);
        clientFinalDTO2.setId(2L);
        assertThat(clientFinalDTO1).isNotEqualTo(clientFinalDTO2);
        clientFinalDTO1.setId(null);
        assertThat(clientFinalDTO1).isNotEqualTo(clientFinalDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(clientFinalMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(clientFinalMapper.fromId(null)).isNull();
    }
}
