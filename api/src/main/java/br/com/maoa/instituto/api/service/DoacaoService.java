package br.com.maoa.instituto.api.service;

import br.com.maoa.instituto.api.dto.DoacaoRequestDTO;
import br.com.maoa.instituto.api.entity.Doacao;
import br.com.maoa.instituto.api.repository.DoacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.UUID;

// Reúne as regras de negócio das doações.
@Service
public class DoacaoService {
    private final DoacaoRepository repository;

    public DoacaoService(DoacaoRepository repository) {
        this.repository = repository;
    }

    public Page<Doacao> listar(String filtro, Pageable pageable) {
        String termo = filtro == null || filtro.isBlank() ? null : filtro.trim();
        return repository.buscarPorTipo(termo, pageable);
    }

    public Doacao buscarPorId(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada."));
    }

    public Doacao cadastrar(DoacaoRequestDTO dados) {
        Doacao doacao = new Doacao(dados.tipoItem().trim(), dados.quantidade(),
                dados.pontoDestino().trim(), LocalDateTime.now());
        return repository.save(doacao);
    }

    public Doacao editar(UUID id, DoacaoRequestDTO dados) {
        Doacao doacao = buscarPorId(id);
        doacao.atualizar(dados.tipoItem().trim(), dados.quantidade(), dados.pontoDestino().trim());
        return repository.save(doacao);
    }

    public void excluir(UUID id) {
        repository.delete(buscarPorId(id));
    }
}
