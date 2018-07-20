package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.pichangas.domain.enumeration.StateBook;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private StateBook state;

    @Column(name = "date_reg")
    private LocalDate dateReg;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "start_hour")
    private Integer startHour;

    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "end_hour")
    private Integer endHour;

    @Column(name = "text")
    private String text;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "all_day")
    private Boolean allDay;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Field field;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Schedule schedule;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private ClientFinal clientFinal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StateBook getState() {
        return state;
    }

    public Booking state(StateBook state) {
        this.state = state;
        return this;
    }

    public void setState(StateBook state) {
        this.state = state;
    }

    public LocalDate getDateReg() {
        return dateReg;
    }

    public Booking dateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
        return this;
    }

    public void setDateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
    }

    public LocalDate getDate() {
        return date;
    }

    public Booking date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getStartHour() {
        return startHour;
    }

    public Booking startHour(Integer startHour) {
        this.startHour = startHour;
        return this;
    }

    public void setStartHour(Integer startHour) {
        this.startHour = startHour;
    }

    public Integer getEndHour() {
        return endHour;
    }

    public Booking endHour(Integer endHour) {
        this.endHour = endHour;
        return this;
    }

    public void setEndHour(Integer endHour) {
        this.endHour = endHour;
    }

    public String getText() {
        return text;
    }

    public Booking text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Booking startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public Booking endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Boolean isAllDay() {
        return allDay;
    }

    public Booking allDay(Boolean allDay) {
        this.allDay = allDay;
        return this;
    }

    public void setAllDay(Boolean allDay) {
        this.allDay = allDay;
    }

    public String getDescription() {
        return description;
    }

    public Booking description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Field getField() {
        return field;
    }

    public Booking field(Field field) {
        this.field = field;
        return this;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Booking schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public ClientFinal getClientFinal() {
        return clientFinal;
    }

    public Booking clientFinal(ClientFinal clientFinal) {
        this.clientFinal = clientFinal;
        return this;
    }

    public void setClientFinal(ClientFinal clientFinal) {
        this.clientFinal = clientFinal;
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
        Booking booking = (Booking) o;
        if (booking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), booking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", dateReg='" + getDateReg() + "'" +
            ", date='" + getDate() + "'" +
            ", startHour=" + getStartHour() +
            ", endHour=" + getEndHour() +
            ", text='" + getText() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", allDay='" + isAllDay() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
