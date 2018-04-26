package com.pichangas.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.pichangas.domain.enumeration.StateBook;

/**
 * A DTO for the Booking entity.
 */
public class BookingDTO implements Serializable {

    private Long id;

    private StateBook state;

    private LocalDate dateReg;

    private LocalDate date;

    @Min(value = 0)
    @Max(value = 23)
    private Integer startHour;

    @Min(value = 0)
    @Max(value = 23)
    private Integer endHour;

    private Long fieldId;

    private Long scheduleId;

    private Long clientFinalId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StateBook getState() {
        return state;
    }

    public void setState(StateBook state) {
        this.state = state;
    }

    public LocalDate getDateReg() {
        return dateReg;
    }

    public void setDateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public Long getFieldId() {
        return fieldId;
    }

    public void setFieldId(Long fieldId) {
        this.fieldId = fieldId;
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getClientFinalId() {
        return clientFinalId;
    }

    public void setClientFinalId(Long clientFinalId) {
        this.clientFinalId = clientFinalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BookingDTO bookingDTO = (BookingDTO) o;
        if(bookingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bookingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BookingDTO{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", dateReg='" + getDateReg() + "'" +
            ", date='" + getDate() + "'" +
            ", startHour=" + getStartHour() +
            ", endHour=" + getEndHour() +
            "}";
    }
}
