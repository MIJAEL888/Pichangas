package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pichangas.domain.enumeration.TypeId;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "sur_name")
    private String surName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_id", nullable = false)
    private TypeId typeId;

    @NotNull
    @Size(min = 8)
    @Column(name = "number_id", nullable = false)
    private String numberId;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "mobile", nullable = false)
    private String mobile;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "date_suscription")
    private LocalDate dateSuscription;

    @Column(name = "jhi_comment")
    private String comment;

    @OneToMany(mappedBy = "client")
    private Set<Campus> campuses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Client name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurName() {
        return surName;
    }

    public Client surName(String surName) {
        this.surName = surName;
        return this;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public TypeId getTypeId() {
        return typeId;
    }

    public Client typeId(TypeId typeId) {
        this.typeId = typeId;
        return this;
    }

    public void setTypeId(TypeId typeId) {
        this.typeId = typeId;
    }

    public String getNumberId() {
        return numberId;
    }

    public Client numberId(String numberId) {
        this.numberId = numberId;
        return this;
    }

    public void setNumberId(String numberId) {
        this.numberId = numberId;
    }

    public String getEmail() {
        return email;
    }

    public Client email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public Client mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public Client address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactName() {
        return contactName;
    }

    public Client contactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public Boolean isStatus() {
        return status;
    }

    public Client status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDate getDateSuscription() {
        return dateSuscription;
    }

    public Client dateSuscription(LocalDate dateSuscription) {
        this.dateSuscription = dateSuscription;
        return this;
    }

    public void setDateSuscription(LocalDate dateSuscription) {
        this.dateSuscription = dateSuscription;
    }

    public String getComment() {
        return comment;
    }

    public Client comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<Campus> getCampuses() {
        return campuses;
    }

    public Client campuses(Set<Campus> campuses) {
        this.campuses = campuses;
        return this;
    }

    public Client addCampus(Campus campus) {
        this.campuses.add(campus);
        campus.setClient(this);
        return this;
    }

    public Client removeCampus(Campus campus) {
        this.campuses.remove(campus);
        campus.setClient(null);
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
        Client client = (Client) o;
        if (client.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), client.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    public Client() {
    }

    public Client(String name, String surName, TypeId typeId, String numberId, String email, String mobile,
                  String address, String contactName, Boolean status, LocalDate dateSuscription, String comment) {
        this.name = name;
        this.surName = surName;
        this.typeId = typeId;
        this.numberId = numberId;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.contactName = contactName;
        this.status = status;
        this.dateSuscription = dateSuscription;
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surName='" + getSurName() + "'" +
            ", typeId='" + getTypeId() + "'" +
            ", numberId='" + getNumberId() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", address='" + getAddress() + "'" +
            ", contactName='" + getContactName() + "'" +
            ", status='" + isStatus() + "'" +
            ", dateSuscription='" + getDateSuscription() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
