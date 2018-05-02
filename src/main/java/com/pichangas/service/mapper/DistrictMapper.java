package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.DistrictDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity District and its DTO DistrictDTO.
 */
@Mapper(componentModel = "spring", uses = {ProvinceMapper.class})
public interface DistrictMapper extends EntityMapper<DistrictDTO, District> {

    @Mapping(source = "province", target = "provinceDto")
    DistrictDTO toDto(District district);

    @Mapping(target = "campuses", ignore = true)
    @Mapping(source = "provinceDto", target = "province")
    District toEntity(DistrictDTO districtDTO);

    default District fromId(Long id) {
        if (id == null) {
            return null;
        }
        District district = new District();
        district.setId(id);
        return district;
    }
}
