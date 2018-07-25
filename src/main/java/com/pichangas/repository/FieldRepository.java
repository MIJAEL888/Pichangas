package com.pichangas.repository;

import com.pichangas.domain.Field;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Field entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {

    List<Field> findAllByCampus_Id(Long id);
}
