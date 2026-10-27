package br.com.maoa.instituto.api.service;

import br.com.maoa.instituto.api.entity.Ponto;
import br.com.maoa.instituto.api.repository.PontoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PontoService {
    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public Page<Ponto> listar(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Ponto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ponto não encontrado."));
    }
}
