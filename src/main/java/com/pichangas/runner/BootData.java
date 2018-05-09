package com.pichangas.runner;

import com.pichangas.domain.*;
import com.pichangas.domain.enumeration.StateField;
import com.pichangas.domain.enumeration.TypeField;
import com.pichangas.domain.enumeration.TypeId;
import com.pichangas.domain.enumeration.TypeSport;
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
    private final FieldRepository fieldRepository;

    public BootData(ClientRepository clientRepository, CampusRepository campusRepository, DepartmentRepository departmentRepository,
                    DistrictRepository districtRepository, ProvinceRepository provinceRepository, FieldRepository fieldRepository) {
        this.clientRepository = clientRepository;
        this.campusRepository = campusRepository;
        this.departmentRepository = departmentRepository;
        this.districtRepository = districtRepository;
        this.provinceRepository = provinceRepository;
        this.fieldRepository = fieldRepository;
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

        Field field1 = new Field("Campo 1" , "Campo 1", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus);
        fieldRepository.save(field1);
        Field field2 = new Field("Campo 2" , "Campo 2", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus);
        fieldRepository.save(field2);
        Field field3 = new Field("Campo 3" , "Campo 3", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus);
        fieldRepository.save(field3);
        Field field4 = new Field("Campo 4" , "Campo 4", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus1);
        fieldRepository.save(field4);
        Field field5 = new Field("Campo 5" , "Campo 5", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus1);
        fieldRepository.save(field5);
        Field field6 = new Field("Campo 6" , "Campo 6", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus1);
        fieldRepository.save(field6);
        Field field7 = new Field("Campo 7" , "Campo 7", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus2);
        fieldRepository.save(field7);
        Field field8 = new Field("Campo 8" , "Campo 8", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus2);
        fieldRepository.save(field8);
        Field field9 = new Field("Campo 9" , "Campo 9", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus3);
        fieldRepository.save(field9);
        Field field10 = new Field("Campo 10" , "Campo 10", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus3);
        fieldRepository.save(field10);
        Field field11 = new Field("Campo 11" , "Campo 11", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus3);
        fieldRepository.save(field11);
        Field field12 = new Field("Campo 12" , "Campo 12", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus4);
        fieldRepository.save(field12);
        Field field13 = new Field("Campo 13" , "Campo 13", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus4);
        fieldRepository.save(field13);
        Field field14 = new Field("Campo 14" , "Campo 14", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus5);
        fieldRepository.save(field14);
        Field field15 = new Field("Campo 15" , "Campo 15", "", 7, TypeField.GRASS, TypeSport.FUTBOL, StateField.AVAILABLE, campus5);
        fieldRepository.save(field15);
    }

    private void initDataClient() {

    }
}
