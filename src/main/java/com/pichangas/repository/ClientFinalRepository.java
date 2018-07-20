package com.pichangas.repository;

import com.pichangas.domain.ClientFinal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ClientFinal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientFinalRepository extends JpaRepository<ClientFinal, Long> {

}
