package com.pichangas.repository;

import com.pichangas.domain.ClientFinal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClientFinal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientFinalRepository extends JpaRepository<ClientFinal, Long> {

}
