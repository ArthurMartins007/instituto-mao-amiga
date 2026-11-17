package br.com.maoa.instituto.api.controller;

import br.com.maoa.instituto.api.dto.DoacaoRequestDTO;
import br.com.maoa.instituto.api.dto.DoacaoResponseDTO;
import br.com.maoa.instituto.api.service.DoacaoService;
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
@RequestMapping("/api/v1/doacoes")
@CrossOrigin(origins = "*")
public class DoacaoController {
    private final DoacaoService service;

    public DoacaoController(DoacaoService service) {
        this.service = service;
    }

    // Lista as doações da mais nova para a mais antiga.
    @GetMapping("/filtro")
    @Operation(summary = "Busca doações por tipo de item com paginação")
    public Page<DoacaoResponseDTO> listar(
            @RequestParam(required = false) String filtro,
            @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        if (pageable.getPageSize() > 50) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O tamanho máximo da página é 50.");
        }
        return service.listar(filtro, pageable).map(DoacaoResponseDTO::from);
    }

    // Busca uma doação pelo UUID.
    @GetMapping("/{id}")
    @Operation(summary = "Busca uma doação pelo UUID")
    public DoacaoResponseDTO buscar(@PathVariable UUID id) {
        return DoacaoResponseDTO.from(service.buscarPorId(id));
    }

    // Cadastra uma doação depois da validação.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cadastra uma doação")
    public DoacaoResponseDTO cadastrar(@Valid @RequestBody DoacaoRequestDTO dados) {
        return DoacaoResponseDTO.from(service.cadastrar(dados));
    }

    // Atualiza os dados sem trocar a data original.
    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma doação")
    public DoacaoResponseDTO editar(@PathVariable UUID id, @Valid @RequestBody DoacaoRequestDTO dados) {
        return DoacaoResponseDTO.from(service.editar(id, dados));
    }

    // Exclui a doação.
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Exclui uma doação")
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }
}
