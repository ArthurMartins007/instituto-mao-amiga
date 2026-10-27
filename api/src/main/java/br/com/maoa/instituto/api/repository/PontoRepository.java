package br.com.maoa.instituto.api.repository;

import br.com.maoa.instituto.api.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
}
