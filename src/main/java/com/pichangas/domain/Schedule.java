package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.pichangas.domain.enumeration.DaysOfWeek;

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "day_of_week")
    private Integer dayOfWeek;

    @Column(name = "name_day_of_week")
    private String nameDayOfWeek;

    @Enumerated(EnumType.STRING)
    @Column(name = "enum_day_of_week")
    private DaysOfWeek enumDayOfWeek;

    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "start_hour")
    private Integer startHour;

    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "end_hour")
    private Integer endHour;

    @Column(name = "jhi_cost")
    private Float cost;

    @Column(name = "price")
    private Float price;

    @Column(name = "rate")
    private Float rate;

    @Column(name = "text")
    private String text;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "all_day")
    private Boolean allDay;

    @ManyToOne
    private Field field;

    @OneToMany(mappedBy = "schedule")
    @JsonIgnore
    private Set<Booking> bookings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public Schedule dayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getNameDayOfWeek() {
        return nameDayOfWeek;
    }

    public Schedule nameDayOfWeek(String nameDayOfWeek) {
        this.nameDayOfWeek = nameDayOfWeek;
        return this;
    }

    public void setNameDayOfWeek(String nameDayOfWeek) {
        this.nameDayOfWeek = nameDayOfWeek;
    }

    public DaysOfWeek getEnumDayOfWeek() {
        return enumDayOfWeek;
    }

    public Schedule enumDayOfWeek(DaysOfWeek enumDayOfWeek) {
        this.enumDayOfWeek = enumDayOfWeek;
        return this;
    }

    public void setEnumDayOfWeek(DaysOfWeek enumDayOfWeek) {
        this.enumDayOfWeek = enumDayOfWeek;
    }

    public Integer getStartHour() {
        return startHour;
    }

    public Schedule startHour(Integer startHour) {
        this.startHour = startHour;
        return this;
    }

    public void setStartHour(Integer startHour) {
        this.startHour = startHour;
    }

    public Integer getEndHour() {
        return endHour;
    }

    public Schedule endHour(Integer endHour) {
        this.endHour = endHour;
        return this;
    }

    public void setEndHour(Integer endHour) {
        this.endHour = endHour;
    }

    public Float getCost() {
        return cost;
    }

    public Schedule cost(Float cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    public Float getPrice() {
        return price;
    }

    public Schedule price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getRate() {
        return rate;
    }

    public Schedule rate(Float rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public String getText() {
        return text;
    }

    public Schedule text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Schedule startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public Schedule endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Boolean isAllDay() {
        return allDay;
    }

    public Schedule allDay(Boolean allDay) {
        this.allDay = allDay;
        return this;
    }

    public void setAllDay(Boolean allDay) {
        this.allDay = allDay;
    }

    public Field getField() {
        return field;
    }

    public Schedule field(Field field) {
        this.field = field;
        return this;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Schedule bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Schedule addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setSchedule(this);
        return this;
    }

    public Schedule removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setSchedule(null);
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
        Schedule schedule = (Schedule) o;
        if (schedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", dayOfWeek=" + getDayOfWeek() +
            ", nameDayOfWeek='" + getNameDayOfWeek() + "'" +
            ", enumDayOfWeek='" + getEnumDayOfWeek() + "'" +
            ", startHour=" + getStartHour() +
            ", endHour=" + getEndHour() +
            ", cost=" + getCost() +
            ", price=" + getPrice() +
            ", rate=" + getRate() +
            ", text='" + getText() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", allDay='" + isAllDay() + "'" +
            "}";
    }
}
