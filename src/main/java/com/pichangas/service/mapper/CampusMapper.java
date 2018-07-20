package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.CampusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Campus and its DTO CampusDTO.
 */
@Mapper(componentModel = "spring", uses = {ClientMapper.class, UserAppMapper.class, DistrictMapper.class})
public interface CampusMapper extends EntityMapper<CampusDTO, Campus> {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "district.id", target = "districtId")
    CampusDTO toDto(Campus campus);

    @Mapping(source = "clientId", target = "client")
    @Mapping(target = "fields", ignore = true)
    @Mapping(source = "districtId", target = "district")
    Campus toEntity(CampusDTO campusDTO);

    default Campus fromId(Long id) {
        if (id == null) {
            return null;
        }
        Campus campus = new Campus();
        campus.setId(id);
        return campus;
    }
}
