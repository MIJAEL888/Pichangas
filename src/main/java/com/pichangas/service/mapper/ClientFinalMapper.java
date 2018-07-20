package com.pichangas.service.mapper;

import com.pichangas.domain.*;
import com.pichangas.service.dto.ClientFinalDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ClientFinal and its DTO ClientFinalDTO.
 */
@Mapper(componentModel = "spring", uses = {UserAppMapper.class})
public interface ClientFinalMapper extends EntityMapper<ClientFinalDTO, ClientFinal> {

    @Mapping(source = "userApp.id", target = "userAppId")
    ClientFinalDTO toDto(ClientFinal clientFinal);

    @Mapping(source = "userAppId", target = "userApp")
    @Mapping(target = "bookings", ignore = true)
    ClientFinal toEntity(ClientFinalDTO clientFinalDTO);

    default ClientFinal fromId(Long id) {
        if (id == null) {
            return null;
        }
        ClientFinal clientFinal = new ClientFinal();
        clientFinal.setId(id);
        return clientFinal;
    }
}
