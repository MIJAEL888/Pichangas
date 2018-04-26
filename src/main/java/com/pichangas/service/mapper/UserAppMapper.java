package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.UserAppDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserApp and its DTO UserAppDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserAppMapper extends EntityMapper<UserAppDTO, UserApp> {


    @Mapping(target = "clientFinal", ignore = true)
    @Mapping(target = "campuses", ignore = true)
    UserApp toEntity(UserAppDTO userAppDTO);

    default UserApp fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserApp userApp = new UserApp();
        userApp.setId(id);
        return userApp;
    }
}
