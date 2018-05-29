package com.pichangas.service.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class FieldFilterDTO implements Serializable {

    private Long idCampus;

    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date date;

    public FieldFilterDTO() {
    }

    public Long getIdCampus() {
        return idCampus;
    }

    public void setIdCampus(Long idCampus) {
        this.idCampus = idCampus;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
