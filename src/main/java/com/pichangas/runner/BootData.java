package com.pichangas.runner;

import com.pichangas.domain.Campus;
import com.pichangas.domain.Client;
import com.pichangas.domain.enumeration.TypeId;
import com.pichangas.repository.CampusRepository;
import com.pichangas.repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BootData implements CommandLineRunner{

    private final ClientRepository clientRepository;
    private final CampusRepository campusRepository;

    public BootData(ClientRepository clientRepository, CampusRepository campusRepository) {
        this.clientRepository = clientRepository;
        this.campusRepository = campusRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (clientRepository.count() == 0){
            initDataClient();
        }
        if (campusRepository.count() == 0){
            initDataCampus();
        }
    }

    private void initDataCampus() {
        Client client = new Client();
        client.setName("Representante 11");
        client.setTypeId(TypeId.DNI);
        client.setNumberId("12345678");
        client.setEmail("mijael888@gmail.com");
        client.setMobile("123456789");
        client.setAddress("Direccion 1");
        client.setStatus(true);
        clientRepository.save(client);

        Campus campus = new Campus();
        campus.setName("La once");
        campus.setOpenTime(9);
        campus.setCloseTime(23);
        campus.setAddresss("Av. la once 123");
        campus.setClient(client);
        campusRepository.save(campus);
    }

    private void initDataClient() {

    }
}
