package br.com.maoa.instituto.api.repository;

import br.com.maoa.instituto.api.entity.Doacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.UUID;

// Centraliza as consultas de doações no banco.
public interface DoacaoRepository extends JpaRepository<Doacao, UUID> {
    @Query("""
            SELECT d FROM Doacao d
            WHERE :filtro IS NULL OR LOWER(d.tipoItem) LIKE LOWER(CONCAT('%', :filtro, '%'))
            """)
    Page<Doacao> buscarPorTipo(@Param("filtro") String filtro, Pageable pageable);
}
