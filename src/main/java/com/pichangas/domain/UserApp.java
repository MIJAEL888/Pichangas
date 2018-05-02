package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserApp.
 */
@Entity
@Table(name = "user_app")
public class UserApp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @Column(name = "jhi_password", nullable = false)
    private String password;

    @Column(name = "date_reg")
    private LocalDate dateReg;

    @Column(name = "faccebook_id")
    private String faccebookId;

    @Column(name = "google_id")
    private String googleId;

    @OneToOne(mappedBy = "userApp")
    private ClientFinal clientFinal;

    @ManyToMany(mappedBy = "userapps")
    private Set<Campus> campuses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public UserApp username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public UserApp password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDateReg() {
        return dateReg;
    }

    public UserApp dateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
        return this;
    }

    public void setDateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
    }

    public String getFaccebookId() {
        return faccebookId;
    }

    public UserApp faccebookId(String faccebookId) {
        this.faccebookId = faccebookId;
        return this;
    }

    public void setFaccebookId(String faccebookId) {
        this.faccebookId = faccebookId;
    }

    public String getGoogleId() {
        return googleId;
    }

    public UserApp googleId(String googleId) {
        this.googleId = googleId;
        return this;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public ClientFinal getClientFinal() {
        return clientFinal;
    }

    public UserApp clientFinal(ClientFinal clientFinal) {
        this.clientFinal = clientFinal;
        return this;
    }

    public void setClientFinal(ClientFinal clientFinal) {
        this.clientFinal = clientFinal;
    }

    public Set<Campus> getCampuses() {
        return campuses;
    }

    public UserApp campuses(Set<Campus> campuses) {
        this.campuses = campuses;
        return this;
    }

    public UserApp addCampus(Campus campus) {
        this.campuses.add(campus);
        campus.getUserapps().add(this);
        return this;
    }

    public UserApp removeCampus(Campus campus) {
        this.campuses.remove(campus);
        campus.getUserapps().remove(this);
        return this;
    }

    public void setCampuses(Set<Campus> campuses) {
        this.campuses = campuses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserApp userApp = (UserApp) o;
        if (userApp.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userApp.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserApp{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", dateReg='" + getDateReg() + "'" +
            ", faccebookId='" + getFaccebookId() + "'" +
            ", googleId='" + getGoogleId() + "'" +
            "}";
    }
}
