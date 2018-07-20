package com.pichangas.web.rest;

import com.pichangas.PichangasApp;

import com.pichangas.domain.UserApp;
import com.pichangas.repository.UserAppRepository;
import com.pichangas.service.UserAppService;
import com.pichangas.service.dto.UserAppDTO;
import com.pichangas.service.mapper.UserAppMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.pichangas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserAppResource REST controller.
 *
 * @see UserAppResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PichangasApp.class)
public class UserAppResourceIntTest {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_REG = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_REG = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FACCEBOOK_ID = "AAAAAAAAAA";
    private static final String UPDATED_FACCEBOOK_ID = "BBBBBBBBBB";

    private static final String DEFAULT_GOOGLE_ID = "AAAAAAAAAA";
    private static final String UPDATED_GOOGLE_ID = "BBBBBBBBBB";

    @Autowired
    private UserAppRepository userAppRepository;


    @Autowired
    private UserAppMapper userAppMapper;
    

    @Autowired
    private UserAppService userAppService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserAppMockMvc;

    private UserApp userApp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserAppResource userAppResource = new UserAppResource(userAppService);
        this.restUserAppMockMvc = MockMvcBuilders.standaloneSetup(userAppResource)
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
    public static UserApp createEntity(EntityManager em) {
        UserApp userApp = new UserApp()
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .dateReg(DEFAULT_DATE_REG)
            .faccebookId(DEFAULT_FACCEBOOK_ID)
            .googleId(DEFAULT_GOOGLE_ID);
        return userApp;
    }

    @Before
    public void initTest() {
        userApp = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserApp() throws Exception {
        int databaseSizeBeforeCreate = userAppRepository.findAll().size();

        // Create the UserApp
        UserAppDTO userAppDTO = userAppMapper.toDto(userApp);
        restUserAppMockMvc.perform(post("/api/user-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAppDTO)))
            .andExpect(status().isCreated());

        // Validate the UserApp in the database
        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeCreate + 1);
        UserApp testUserApp = userAppList.get(userAppList.size() - 1);
        assertThat(testUserApp.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testUserApp.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testUserApp.getDateReg()).isEqualTo(DEFAULT_DATE_REG);
        assertThat(testUserApp.getFaccebookId()).isEqualTo(DEFAULT_FACCEBOOK_ID);
        assertThat(testUserApp.getGoogleId()).isEqualTo(DEFAULT_GOOGLE_ID);
    }

    @Test
    @Transactional
    public void createUserAppWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userAppRepository.findAll().size();

        // Create the UserApp with an existing ID
        userApp.setId(1L);
        UserAppDTO userAppDTO = userAppMapper.toDto(userApp);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserAppMockMvc.perform(post("/api/user-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAppDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserApp in the database
        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAppRepository.findAll().size();
        // set the field null
        userApp.setUsername(null);

        // Create the UserApp, which fails.
        UserAppDTO userAppDTO = userAppMapper.toDto(userApp);

        restUserAppMockMvc.perform(post("/api/user-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAppDTO)))
            .andExpect(status().isBadRequest());

        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = userAppRepository.findAll().size();
        // set the field null
        userApp.setPassword(null);

        // Create the UserApp, which fails.
        UserAppDTO userAppDTO = userAppMapper.toDto(userApp);

        restUserAppMockMvc.perform(post("/api/user-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAppDTO)))
            .andExpect(status().isBadRequest());

        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserApps() throws Exception {
        // Initialize the database
        userAppRepository.saveAndFlush(userApp);

        // Get all the userAppList
        restUserAppMockMvc.perform(get("/api/user-apps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].dateReg").value(hasItem(DEFAULT_DATE_REG.toString())))
            .andExpect(jsonPath("$.[*].faccebookId").value(hasItem(DEFAULT_FACCEBOOK_ID.toString())))
            .andExpect(jsonPath("$.[*].googleId").value(hasItem(DEFAULT_GOOGLE_ID.toString())));
    }
    

    @Test
    @Transactional
    public void getUserApp() throws Exception {
        // Initialize the database
        userAppRepository.saveAndFlush(userApp);

        // Get the userApp
        restUserAppMockMvc.perform(get("/api/user-apps/{id}", userApp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userApp.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.dateReg").value(DEFAULT_DATE_REG.toString()))
            .andExpect(jsonPath("$.faccebookId").value(DEFAULT_FACCEBOOK_ID.toString()))
            .andExpect(jsonPath("$.googleId").value(DEFAULT_GOOGLE_ID.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUserApp() throws Exception {
        // Get the userApp
        restUserAppMockMvc.perform(get("/api/user-apps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserApp() throws Exception {
        // Initialize the database
        userAppRepository.saveAndFlush(userApp);

        int databaseSizeBeforeUpdate = userAppRepository.findAll().size();

        // Update the userApp
        UserApp updatedUserApp = userAppRepository.findById(userApp.getId()).get();
        // Disconnect from session so that the updates on updatedUserApp are not directly saved in db
        em.detach(updatedUserApp);
        updatedUserApp
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .dateReg(UPDATED_DATE_REG)
            .faccebookId(UPDATED_FACCEBOOK_ID)
            .googleId(UPDATED_GOOGLE_ID);
        UserAppDTO userAppDTO = userAppMapper.toDto(updatedUserApp);

        restUserAppMockMvc.perform(put("/api/user-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAppDTO)))
            .andExpect(status().isOk());

        // Validate the UserApp in the database
        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeUpdate);
        UserApp testUserApp = userAppList.get(userAppList.size() - 1);
        assertThat(testUserApp.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testUserApp.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testUserApp.getDateReg()).isEqualTo(UPDATED_DATE_REG);
        assertThat(testUserApp.getFaccebookId()).isEqualTo(UPDATED_FACCEBOOK_ID);
        assertThat(testUserApp.getGoogleId()).isEqualTo(UPDATED_GOOGLE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingUserApp() throws Exception {
        int databaseSizeBeforeUpdate = userAppRepository.findAll().size();

        // Create the UserApp
        UserAppDTO userAppDTO = userAppMapper.toDto(userApp);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserAppMockMvc.perform(put("/api/user-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAppDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserApp in the database
        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserApp() throws Exception {
        // Initialize the database
        userAppRepository.saveAndFlush(userApp);

        int databaseSizeBeforeDelete = userAppRepository.findAll().size();

        // Get the userApp
        restUserAppMockMvc.perform(delete("/api/user-apps/{id}", userApp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserApp> userAppList = userAppRepository.findAll();
        assertThat(userAppList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserApp.class);
        UserApp userApp1 = new UserApp();
        userApp1.setId(1L);
        UserApp userApp2 = new UserApp();
        userApp2.setId(userApp1.getId());
        assertThat(userApp1).isEqualTo(userApp2);
        userApp2.setId(2L);
        assertThat(userApp1).isNotEqualTo(userApp2);
        userApp1.setId(null);
        assertThat(userApp1).isNotEqualTo(userApp2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserAppDTO.class);
        UserAppDTO userAppDTO1 = new UserAppDTO();
        userAppDTO1.setId(1L);
        UserAppDTO userAppDTO2 = new UserAppDTO();
        assertThat(userAppDTO1).isNotEqualTo(userAppDTO2);
        userAppDTO2.setId(userAppDTO1.getId());
        assertThat(userAppDTO1).isEqualTo(userAppDTO2);
        userAppDTO2.setId(2L);
        assertThat(userAppDTO1).isNotEqualTo(userAppDTO2);
        userAppDTO1.setId(null);
        assertThat(userAppDTO1).isNotEqualTo(userAppDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userAppMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userAppMapper.fromId(null)).isNull();
    }
}
