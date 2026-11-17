package br.com.maoa.instituto.api.repository;

import br.com.maoa.instituto.api.entity.Ponto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.UUID;

// Centraliza as consultas de pontos no banco.
public interface PontoRepository extends JpaRepository<Ponto, UUID> {
    @Query("""
            SELECT p FROM Ponto p
            WHERE :filtro IS NULL
               OR LOWER(p.nome) LIKE LOWER(CONCAT('%', :filtro, '%'))
               OR LOWER(p.bairro) LIKE LOWER(CONCAT('%', :filtro, '%'))
            """)
    Page<Ponto> buscarPorNomeOuBairro(@Param("filtro") String filtro, Pageable pageable);
}
