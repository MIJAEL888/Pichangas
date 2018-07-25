package com.pichangas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Campus.
 */
@Entity
@Table(name = "campus")
public class Campus implements Serializable {

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
    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "open_time", nullable = false)
    private Integer openTime;

    @NotNull
    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "close_time", nullable = false)
    private Integer closeTime;

    @Column(name = "aditional")
    private String aditional;

    @NotNull
    @Column(name = "addresss", nullable = false)
    private String addresss;

    @Column(name = "reference")
    private String reference;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "cod_postal")
    private String codPostal;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "rating")
    private String rating;

    @ManyToOne
    @JsonIgnoreProperties("campuses")
    private Client client;

    @OneToMany(mappedBy = "campus")
    private Set<Field> fields = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "campus_userapp",
               joinColumns = @JoinColumn(name = "campuses_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "userapps_id", referencedColumnName = "id"))
    private Set<UserApp> userapps = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("campuses")
    private District district;

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

    public Campus name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Campus description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComment() {
        return comment;
    }

    public Campus comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getOpenTime() {
        return openTime;
    }

    public Campus openTime(Integer openTime) {
        this.openTime = openTime;
        return this;
    }

    public void setOpenTime(Integer openTime) {
        this.openTime = openTime;
    }

    public Integer getCloseTime() {
        return closeTime;
    }

    public Campus closeTime(Integer closeTime) {
        this.closeTime = closeTime;
        return this;
    }

    public void setCloseTime(Integer closeTime) {
        this.closeTime = closeTime;
    }

    public String getAditional() {
        return aditional;
    }

    public Campus aditional(String aditional) {
        this.aditional = aditional;
        return this;
    }

    public void setAditional(String aditional) {
        this.aditional = aditional;
    }

    public String getAddresss() {
        return addresss;
    }

    public Campus addresss(String addresss) {
        this.addresss = addresss;
        return this;
    }

    public void setAddresss(String addresss) {
        this.addresss = addresss;
    }

    public String getReference() {
        return reference;
    }

    public Campus reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Campus latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Campus longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCodPostal() {
        return codPostal;
    }

    public Campus codPostal(String codPostal) {
        this.codPostal = codPostal;
        return this;
    }

    public void setCodPostal(String codPostal) {
        this.codPostal = codPostal;
    }

    public Boolean isStatus() {
        return status;
    }

    public Campus status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRating() {
        return rating;
    }

    public Campus rating(String rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Client getClient() {
        return client;
    }

    public Campus client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Field> getFields() {
        return fields;
    }

    public Campus fields(Set<Field> fields) {
        this.fields = fields;
        return this;
    }

    public Campus addField(Field field) {
        this.fields.add(field);
        field.setCampus(this);
        return this;
    }

    public Campus removeField(Field field) {
        this.fields.remove(field);
        field.setCampus(null);
        return this;
    }

    public void setFields(Set<Field> fields) {
        this.fields = fields;
    }

    public Set<UserApp> getUserapps() {
        return userapps;
    }

    public Campus userapps(Set<UserApp> userApps) {
        this.userapps = userApps;
        return this;
    }

    public Campus addUserapp(UserApp userApp) {
        this.userapps.add(userApp);
        userApp.getCampuses().add(this);
        return this;
    }

    public Campus removeUserapp(UserApp userApp) {
        this.userapps.remove(userApp);
        userApp.getCampuses().remove(this);
        return this;
    }

    public void setUserapps(Set<UserApp> userApps) {
        this.userapps = userApps;
    }

    public District getDistrict() {
        return district;
    }

    public Campus district(District district) {
        this.district = district;
        return this;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public Campus() {
    }

    public Campus(String name, String description, String comment, Integer openTime, Integer closeTime, String aditional,
                  String addresss, String reference, Double latitude, Double longitude, String codPostal, Boolean status,
                  String rating, Client client, District district) {
        this.name = name;
        this.description = description;
        this.comment = comment;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.aditional = aditional;
        this.addresss = addresss;
        this.reference = reference;
        this.latitude = latitude;
        this.longitude = longitude;
        this.codPostal = codPostal;
        this.status = status;
        this.rating = rating;
        this.client = client;
        this.district = district;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Campus campus = (Campus) o;
        if (campus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Campus{" +
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
