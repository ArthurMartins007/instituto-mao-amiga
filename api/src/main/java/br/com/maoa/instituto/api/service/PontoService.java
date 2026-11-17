package br.com.maoa.instituto.api.service;

import br.com.maoa.instituto.api.dto.PontoRequestDTO;
import br.com.maoa.instituto.api.entity.Ponto;
import br.com.maoa.instituto.api.repository.PontoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.UUID;

// Reúne as regras de cadastro, busca, edição e exclusão de pontos.
@Service
public class PontoService {
    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public Page<Ponto> listar(String filtro, Pageable pageable) {
        String termo = filtro == null || filtro.isBlank() ? null : filtro.trim();
        return repository.buscarPorNomeOuBairro(termo, pageable);
    }

    public Ponto buscarPorId(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ponto não encontrado."));
    }

    public Ponto cadastrar(PontoRequestDTO dados) {
        Ponto ponto = new Ponto(
                dados.nome().trim(), dados.endereco().trim(), dados.bairro().trim(),
                dados.horario().trim(), normalizarTipo(dados.tipo()), null, null
        );
        return repository.save(ponto);
    }

    public Ponto editar(UUID id, PontoRequestDTO dados) {
        Ponto ponto = buscarPorId(id);
        ponto.atualizar(
                dados.nome().trim(), dados.endereco().trim(), dados.bairro().trim(),
                dados.horario().trim(), normalizarTipo(dados.tipo())
        );
        return repository.save(ponto);
    }

    public void excluir(UUID id) {
        repository.delete(buscarPorId(id));
    }

    private String normalizarTipo(String tipo) {
        return tipo.trim().equalsIgnoreCase("coleta") ? "coleta" : "distribuição";
    }
}
