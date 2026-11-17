package br.com.maoa.instituto.api.controller;

import br.com.maoa.instituto.api.dto.PontoRequestDTO;
import br.com.maoa.instituto.api.dto.PontoResponseDTO;
import br.com.maoa.instituto.api.service.PontoService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pontos")
@CrossOrigin(origins = "*")
public class PontoController {
    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    // Lista os pontos em páginas, já convertidos para DTO.
    @GetMapping
    @Operation(summary = "Lista os pontos com paginação")
    public Page<PontoResponseDTO> listar(
            @RequestParam(required = false) String filtro,
            @PageableDefault(size = 10, sort = "nome", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        validarPagina(pageable);
        return service.listar(filtro, pageable).map(PontoResponseDTO::from);
    }

    // Pesquisa por nome ou bairro, sem diferenciar maiúsculas.
    @GetMapping("/filtro")
    @Operation(summary = "Busca pontos pelo nome ou bairro com paginação")
    public Page<PontoResponseDTO> filtrar(
            @RequestParam(required = false) String filtro,
            @PageableDefault(size = 10, sort = "nome", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        validarPagina(pageable);
        return service.listar(filtro, pageable).map(PontoResponseDTO::from);
    }

    // Busca um ponto pelo UUID.
    @GetMapping("/{id}")
    @Operation(summary = "Busca um ponto pelo UUID")
    public PontoResponseDTO buscar(@PathVariable UUID id) {
        return PontoResponseDTO.from(service.buscarPorId(id));
    }

    // Valida e cadastra um ponto novo.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cadastra um ponto")
    public PontoResponseDTO cadastrar(@Valid @RequestBody PontoRequestDTO dados) {
        return PontoResponseDTO.from(service.cadastrar(dados));
    }

    // Atualiza um ponto existente.
    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um ponto")
    public PontoResponseDTO editar(@PathVariable UUID id, @Valid @RequestBody PontoRequestDTO dados) {
        return PontoResponseDTO.from(service.editar(id, dados));
    }

    // Exclui um ponto ou devolve 404 se não existir.
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Exclui um ponto")
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }

    private void validarPagina(Pageable pageable) {
        if (pageable.getPageSize() > 50) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O tamanho máximo da página é 50.");
        }
    }
}
