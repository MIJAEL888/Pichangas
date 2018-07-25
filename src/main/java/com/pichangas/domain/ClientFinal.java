package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ClientFinal.
 */
@Entity
@Table(name = "client_final")
public class ClientFinal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "sur_name", nullable = false)
    private String surName;

    @NotNull
    @Column(name = "mobile", nullable = false)
    private String mobile;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "num_document")
    private String numDocument;

    @OneToOne
    @JoinColumn(unique = true)
    private UserApp userApp;

    @OneToMany(mappedBy = "clientFinal")
    private Set<Booking> bookings = new HashSet<>();

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

    public ClientFinal name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurName() {
        return surName;
    }

    public ClientFinal surName(String surName) {
        this.surName = surName;
        return this;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getMobile() {
        return mobile;
    }

    public ClientFinal mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public ClientFinal email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumDocument() {
        return numDocument;
    }

    public ClientFinal numDocument(String numDocument) {
        this.numDocument = numDocument;
        return this;
    }

    public void setNumDocument(String numDocument) {
        this.numDocument = numDocument;
    }

    public UserApp getUserApp() {
        return userApp;
    }

    public ClientFinal userApp(UserApp userApp) {
        this.userApp = userApp;
        return this;
    }

    public void setUserApp(UserApp userApp) {
        this.userApp = userApp;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public ClientFinal bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public ClientFinal addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setClientFinal(this);
        return this;
    }

    public ClientFinal removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setClientFinal(null);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
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
        ClientFinal clientFinal = (ClientFinal) o;
        if (clientFinal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientFinal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientFinal{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surName='" + getSurName() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", email='" + getEmail() + "'" +
            ", numDocument='" + getNumDocument() + "'" +
            "}";
    }
}
