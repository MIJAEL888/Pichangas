package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.CampusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Campus and its DTO CampusDTO.
 */
@Mapper(componentModel = "spring", uses = {ClientMapper.class, UserAppMapper.class, DistrictMapper.class})
public interface CampusMapper extends EntityMapper<CampusDTO, Campus> {

    @Mapping(source = "client", target = "clientDto")
    @Mapping(source = "district", target = "districtDto")
    CampusDTO toDto(Campus campus);

    @Mapping(source = "clientDto", target = "client")
    @Mapping(source = "districtDto", target = "district")
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
