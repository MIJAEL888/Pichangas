package com.pichangas.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ClientFinal entity.
 */
public class ClientFinalDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String surName;

    @NotNull
    private String mobile;

    @NotNull
    private String email;

    private String numDocument;

    private UserAppDTO userAppDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumDocument() {
        return numDocument;
    }

    public void setNumDocument(String numDocument) {
        this.numDocument = numDocument;
    }

    public UserAppDTO getUserAppDto() {
        return userAppDto;
    }

    public void setUserAppDto(UserAppDTO userAppDto) {
        this.userAppDto = userAppDto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClientFinalDTO clientFinalDTO = (ClientFinalDTO) o;
        if (clientFinalDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientFinalDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientFinalDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surName='" + getSurName() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", email='" + getEmail() + "'" +
            ", numDocument='" + getNumDocument() + "'" +
            "}";
    }
}
