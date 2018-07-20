package com.pichangas.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserApp entity.
 */
public class UserAppDTO implements Serializable {

    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    private LocalDate dateReg;

    private String faccebookId;

    private String googleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDateReg() {
        return dateReg;
    }

    public void setDateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
    }

    public String getFaccebookId() {
        return faccebookId;
    }

    public void setFaccebookId(String faccebookId) {
        this.faccebookId = faccebookId;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserAppDTO userAppDTO = (UserAppDTO) o;
        if (userAppDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAppDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAppDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", dateReg='" + getDateReg() + "'" +
            ", faccebookId='" + getFaccebookId() + "'" +
            ", googleId='" + getGoogleId() + "'" +
            "}";
    }
}
