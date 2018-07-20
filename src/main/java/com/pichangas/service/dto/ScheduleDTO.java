package com.pichangas.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.pichangas.domain.enumeration.DaysOfWeek;

/**
 * A DTO for the Schedule entity.
 */
public class ScheduleDTO implements Serializable {

    private Long id;

    @Min(value = 0)
    @Max(value = 23)
    private Integer dayOfWeek;

    private String nameDayOfWeek;

    private DaysOfWeek enumDayOfWeek;

    @Min(value = 0)
    @Max(value = 23)
    private Integer startHour;

    @Min(value = 0)
    @Max(value = 23)
    private Integer endHour;

    private Float cost;

    private Float price;

    private Float rate;

    private String text;

    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    private Boolean allDay;

    private Long fieldId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getNameDayOfWeek() {
        return nameDayOfWeek;
    }

    public void setNameDayOfWeek(String nameDayOfWeek) {
        this.nameDayOfWeek = nameDayOfWeek;
    }

    public DaysOfWeek getEnumDayOfWeek() {
        return enumDayOfWeek;
    }

    public void setEnumDayOfWeek(DaysOfWeek enumDayOfWeek) {
        this.enumDayOfWeek = enumDayOfWeek;
    }

    public Integer getStartHour() {
        return startHour;
    }

    public void setStartHour(Integer startHour) {
        this.startHour = startHour;
    }

    public Integer getEndHour() {
        return endHour;
    }

    public void setEndHour(Integer endHour) {
        this.endHour = endHour;
    }

    public Float getCost() {
        return cost;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Boolean isAllDay() {
        return allDay;
    }

    public void setAllDay(Boolean allDay) {
        this.allDay = allDay;
    }

    public Long getFieldId() {
        return fieldId;
    }

    public void setFieldId(Long fieldId) {
        this.fieldId = fieldId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ScheduleDTO scheduleDTO = (ScheduleDTO) o;
        if(scheduleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scheduleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScheduleDTO{" +
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
