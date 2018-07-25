package com.pichangas.repository;

import com.pichangas.domain.Campus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Campus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampusRepository extends JpaRepository<Campus, Long> {

    @Query(value = "select distinct campus from Campus campus left join fetch campus.userapps",
        countQuery = "select count(distinct campus) from Campus campus")
    Page<Campus> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct campus from Campus campus left join fetch campus.userapps")
    List<Campus> findAllWithEagerRelationships();

    @Query("select campus from Campus campus left join fetch campus.userapps where campus.id =:id")
    Optional<Campus> findOneWithEagerRelationships(@Param("id") Long id);

    List<Campus> findAllByClient_Id(Long id);
}
