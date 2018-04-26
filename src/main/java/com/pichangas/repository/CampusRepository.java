package com.pichangas.repository;

import com.pichangas.domain.Campus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Campus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampusRepository extends JpaRepository<Campus, Long> {
    @Query("select distinct campus from Campus campus left join fetch campus.userapps")
    List<Campus> findAllWithEagerRelationships();

    @Query("select campus from Campus campus left join fetch campus.userapps where campus.id =:id")
    Campus findOneWithEagerRelationships(@Param("id") Long id);

}
