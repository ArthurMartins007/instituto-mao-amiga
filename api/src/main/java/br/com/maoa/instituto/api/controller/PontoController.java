package br.com.maoa.instituto.api.controller;

import br.com.maoa.instituto.api.dto.PontoPageResponse;
import br.com.maoa.instituto.api.dto.PontoResponse;
import br.com.maoa.instituto.api.entity.Ponto;
import br.com.maoa.instituto.api.service.PontoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/pontos")
@CrossOrigin(origins = "*")
public class PontoController {
    private static final int TAMANHO_PADRAO = 20;
    private static final int TAMANHO_MAXIMO = 50;
    private static final String ORDENACAO_PADRAO = "nome,asc";
    private static final java.util.Set<String> CAMPOS_ORDENAVEIS = java.util.Set.of(
            "id", "nome", "endereco", "horario", "recebeDistribui", "latitude", "longitude"
    );

    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    @GetMapping
    public PontoPageResponse listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = ORDENACAO_PADRAO) String sort
    ) {
        if (page < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A página não pode ser negativa.");
        }
        if (size < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O tamanho da página deve ser maior que zero.");
        }

        int tamanho = Math.min(size, TAMANHO_MAXIMO);
        Pageable pageable = PageRequest.of(page, tamanho, criarOrdenacao(sort));
        Page<PontoResponse> resultado = service.listar(pageable).map(PontoResponse::from);
        PontoPageResponse.PageInfo informacoes = new PontoPageResponse.PageInfo(
                resultado.getNumber(),
                resultado.getSize(),
                resultado.getTotalElements(),
                resultado.getTotalPages()
        );
        return new PontoPageResponse(resultado.getContent(), informacoes);
    }

    @GetMapping("/{id}")
    public PontoResponse buscarPorId(@PathVariable Long id) {
        Ponto ponto = service.buscarPorId(id);
        return PontoResponse.from(ponto);
    }

    private Sort criarOrdenacao(String sort) {
        String[] partes = sort.split(",", 2);
        String campo = partes[0].trim();
        if (!CAMPOS_ORDENAVEIS.contains(campo)) {
            campo = "nome";
        }
        Sort.Direction direcao = Sort.Direction.ASC;
        if (partes.length > 1) {
            try {
                direcao = Sort.Direction.fromString(partes[1].trim());
            } catch (IllegalArgumentException ignored) {
                direcao = Sort.Direction.ASC;
            }
        }
        return Sort.by(direcao, campo);
    }
}
