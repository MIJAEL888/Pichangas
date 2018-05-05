package com.pichangas.runner;

import com.pichangas.domain.*;
import com.pichangas.domain.enumeration.TypeId;
import com.pichangas.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class BootData implements CommandLineRunner{

    private final ClientRepository clientRepository;
    private final CampusRepository campusRepository;
    private final DepartmentRepository departmentRepository;
    private final DistrictRepository districtRepository;
    private final ProvinceRepository provinceRepository;

    public BootData(ClientRepository clientRepository, CampusRepository campusRepository, DepartmentRepository departmentRepository, DistrictRepository districtRepository, ProvinceRepository provinceRepository) {
        this.clientRepository = clientRepository;
        this.campusRepository = campusRepository;
        this.departmentRepository = departmentRepository;
        this.districtRepository = districtRepository;
        this.provinceRepository = provinceRepository;
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
        Department department = new Department("Lima","01");
        departmentRepository.save(department);

        Province province = new Province("Lima", "01", department);
        provinceRepository.save(province);

        District district = new District("La Molina", "01", province);
        districtRepository.save(district);
        District district1 = new District("Los Olivos", "02", province);
        districtRepository.save(district1);
        District district2 = new District("Pueblo Libre", "03", province);
        districtRepository.save(district2);
        District district3 = new District("Miraflores", "04", province);
        districtRepository.save(district3);
        District district4 = new District("Punta Hermosa", "05", province);
        districtRepository.save(district4);
        District district5 = new District("San Borja", "06", province);
        districtRepository.save(district5);
        District district6 = new District("San Isidro", "07", province);
        districtRepository.save(district6);
        District district7 = new District("San Luis", "08", province);
        districtRepository.save(district7);
        District district8 = new District("San Miguel", "09", province);
        districtRepository.save(district8);


        Client client = new Client("Representante 1", "", TypeId.DNI, "12345678", "mijael888@gmail.com", "123456789", "Direccion 1", "Contact1", true, LocalDate.now(), "");
        clientRepository.save(client);

        Client client2 = new Client("Representante 2", "", TypeId.DNI, "12345678", "mijael888@gmail.com", "123456789", "Direccion 2", "Contact2", true, LocalDate.now(), "");
        clientRepository.save(client2);

        Client client3 = new Client("Representante 3", "", TypeId.DNI, "12345678", "mijael888@gmail.com", "123456789", "Direccion 3", "Contact3", true, LocalDate.now(), "");
        clientRepository.save(client3);

        Campus campus = new Campus("La once", "Cancha la 11", "Comment1", 10, 23, "Incluye Camisetas", "Direccion 11", "", 123456.23D, 1234.12D,"051", true, "", client, district);
        campusRepository.save(campus);

        Campus campus1 = new Campus("La Doce", "Cancha la 12", "Comment2", 10, 23, "Incluye Camisetas", "Direccion 12", "", 123456.23D, 1234.12D,"051", true, "", client, district2);
        campusRepository.save(campus1);

        Campus campus2 = new Campus("Sede 2", "Cancha sede 2", "Comment3", 10, 23, "Incluye Camisetas", "Direccion sede 3", "", 123456.23D, 1234.12D,"051", true, "", client2, district3);
        campusRepository.save(campus2);

        Campus campus3 = new Campus("Sede 3", "Cancha sede 3", "Comment4", 10, 23, "Incluye Camisetas", "Direccion sede 2", "", 123456.23D, 1234.12D,"051", true, "", client2, district4);
        campusRepository.save(campus3);

        Campus campus4 = new Campus("Sede 1", "Cancha sede 1", "Comment5", 10, 23, "Incluye Camisetas", "Direccion sede 1", "", 123456.23D, 1234.12D,"051", true, "", client2, district5);
        campusRepository.save(campus4);

        Campus campus5 = new Campus("Sede 1", "Cancha sede 1", "Comment6", 10, 23, "Incluye Camisetas", "Av. Ingenieros 11", "", 123456.23D, 1234.12D,"051", true, "", client3, district6);
        campusRepository.save(campus5);

    }

    private void initDataClient() {

    }
}
