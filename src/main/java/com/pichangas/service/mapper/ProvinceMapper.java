package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.ProvinceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Province and its DTO ProvinceDTO.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class})
public interface ProvinceMapper extends EntityMapper<ProvinceDTO, Province> {

    @Mapping(source = "department.id", target = "departmentId")
    ProvinceDTO toDto(Province province);

    @Mapping(source = "departmentId", target = "department")
    @Mapping(target = "districts", ignore = true)
    Province toEntity(ProvinceDTO provinceDTO);

    default Province fromId(Long id) {
        if (id == null) {
            return null;
        }
        Province province = new Province();
        province.setId(id);
        return province;
    }
}
