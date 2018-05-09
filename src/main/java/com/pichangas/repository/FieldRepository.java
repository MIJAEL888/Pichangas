package com.pichangas.repository;

import com.pichangas.domain.Field;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Field entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {

    List<Field> findAllByCampus_Id(Long id);
}
