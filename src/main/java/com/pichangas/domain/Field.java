package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pichangas.domain.enumeration.TypeField;

import com.pichangas.domain.enumeration.TypeSport;

import com.pichangas.domain.enumeration.StateField;

/**
 * A Field.
 */
@Entity
@Table(name = "field")
public class Field implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_comment")
    private String comment;

    @NotNull
    @Column(name = "num_players", nullable = false)
    private Integer numPlayers;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_field", nullable = false)
    private TypeField typeField;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type_sport", nullable = false)
    private TypeSport typeSport;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private StateField state;

    @ManyToOne
    private Campus campus;

    @OneToMany(mappedBy = "field")
    @JsonIgnore
    private Set<Schedule> schedules = new HashSet<>();

    @OneToMany(mappedBy = "field")
    @JsonIgnore
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

    public Field name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Field description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComment() {
        return comment;
    }

    public Field comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getNumPlayers() {
        return numPlayers;
    }

    public Field numPlayers(Integer numPlayers) {
        this.numPlayers = numPlayers;
        return this;
    }

    public void setNumPlayers(Integer numPlayers) {
        this.numPlayers = numPlayers;
    }

    public TypeField getTypeField() {
        return typeField;
    }

    public Field typeField(TypeField typeField) {
        this.typeField = typeField;
        return this;
    }

    public void setTypeField(TypeField typeField) {
        this.typeField = typeField;
    }

    public TypeSport getTypeSport() {
        return typeSport;
    }

    public Field typeSport(TypeSport typeSport) {
        this.typeSport = typeSport;
        return this;
    }

    public void setTypeSport(TypeSport typeSport) {
        this.typeSport = typeSport;
    }

    public StateField getState() {
        return state;
    }

    public Field state(StateField state) {
        this.state = state;
        return this;
    }

    public void setState(StateField state) {
        this.state = state;
    }

    public Campus getCampus() {
        return campus;
    }

    public Field campus(Campus campus) {
        this.campus = campus;
        return this;
    }

    public void setCampus(Campus campus) {
        this.campus = campus;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public Field schedules(Set<Schedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public Field addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.setField(this);
        return this;
    }

    public Field removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.setField(null);
        return this;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Field bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Field addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setField(this);
        return this;
    }

    public Field removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setField(null);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public Field() {
    }

    public Field(String name, String description, String comment, Integer numPlayers, TypeField typeField, TypeSport typeSport,
                 StateField state, Campus campus) {
        this.name = name;
        this.description = description;
        this.comment = comment;
        this.numPlayers = numPlayers;
        this.typeField = typeField;
        this.typeSport = typeSport;
        this.state = state;
        this.campus = campus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Field field = (Field) o;
        if (field.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), field.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Field{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", comment='" + getComment() + "'" +
            ", numPlayers=" + getNumPlayers() +
            ", typeField='" + getTypeField() + "'" +
            ", typeSport='" + getTypeSport() + "'" +
            ", state='" + getState() + "'" +
            "}";
    }
}
