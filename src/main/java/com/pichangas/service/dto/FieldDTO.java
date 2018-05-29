package com.pichangas.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Objects;
import com.pichangas.domain.enumeration.TypeField;
import com.pichangas.domain.enumeration.TypeSport;
import com.pichangas.domain.enumeration.StateField;

/**
 * A DTO for the Field entity.
 */
public class FieldDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String description;

    private String comment;

    @NotNull
    private Integer numPlayers;

    @NotNull
    private TypeField typeField;

    @NotNull
    private TypeSport typeSport;

    @NotNull
    private StateField state;

    private CampusDTO campusDto;

    private List<BookingDTO> bookingsDTO;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getNumPlayers() {
        return numPlayers;
    }

    public void setNumPlayers(Integer numPlayers) {
        this.numPlayers = numPlayers;
    }

    public TypeField getTypeField() {
        return typeField;
    }

    public void setTypeField(TypeField typeField) {
        this.typeField = typeField;
    }

    public TypeSport getTypeSport() {
        return typeSport;
    }

    public void setTypeSport(TypeSport typeSport) {
        this.typeSport = typeSport;
    }

    public StateField getState() {
        return state;
    }

    public void setState(StateField state) {
        this.state = state;
    }

    public CampusDTO getCampusDto() {
        return campusDto;
    }

    public void setCampusDto(CampusDTO campusDto) {
        this.campusDto = campusDto;
    }

    public List<BookingDTO> getBookingsDTO() {
        return bookingsDTO;
    }

    public void setBookingsDTO(List<BookingDTO> bookingsDTO) {
        this.bookingsDTO = bookingsDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FieldDTO fieldDTO = (FieldDTO) o;
        if(fieldDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fieldDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FieldDTO{" +
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
