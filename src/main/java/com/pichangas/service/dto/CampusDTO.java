package com.pichangas.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Campus entity.
 */
public class CampusDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String description;

    private String comment;

    @NotNull
    @Min(value = 0)
    @Max(value = 23)
    private Integer openTime;

    @NotNull
    @Min(value = 0)
    @Max(value = 23)
    private Integer closeTime;

    private String aditional;

    @NotNull
    private String addresss;

    private String reference;

    private Double latitude;

    private Double longitude;

    private String codPostal;

    private Boolean status;

    private String rating;

    private ClientDTO clientDto;

    private Set<UserAppDTO> userapps = new HashSet<>();

    private DistrictDTO districtDto;

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

    public Integer getOpenTime() {
        return openTime;
    }

    public void setOpenTime(Integer openTime) {
        this.openTime = openTime;
    }

    public Integer getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Integer closeTime) {
        this.closeTime = closeTime;
    }

    public String getAditional() {
        return aditional;
    }

    public void setAditional(String aditional) {
        this.aditional = aditional;
    }

    public String getAddresss() {
        return addresss;
    }

    public void setAddresss(String addresss) {
        this.addresss = addresss;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCodPostal() {
        return codPostal;
    }

    public void setCodPostal(String codPostal) {
        this.codPostal = codPostal;
    }

    public Boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public ClientDTO getClientDto() {
        return clientDto;
    }

    public void setClientDto(ClientDTO clientDto) {
        this.clientDto = clientDto;
    }

    public DistrictDTO getDistrictDto() {
        return districtDto;
    }

    public void setDistrictDto(DistrictDTO districtDto) {
        this.districtDto = districtDto;
    }

    public Set<UserAppDTO> getUserapps() {
        return userapps;
    }

    public void setUserapps(Set<UserAppDTO> userapps) {
        this.userapps = userapps;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CampusDTO campusDTO = (CampusDTO) o;
        if(campusDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campusDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampusDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", comment='" + getComment() + "'" +
            ", openTime=" + getOpenTime() +
            ", closeTime=" + getCloseTime() +
            ", aditional='" + getAditional() + "'" +
            ", addresss='" + getAddresss() + "'" +
            ", reference='" + getReference() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", codPostal='" + getCodPostal() + "'" +
            ", status='" + isStatus() + "'" +
            ", rating='" + getRating() + "'" +
            "}";
    }
}
