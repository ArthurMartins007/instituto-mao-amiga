package br.com.maoa.instituto.api.dto;

import br.com.maoa.instituto.api.entity.Ponto;
import java.util.UUID;

// Resposta pública da API, sem expor a entidade JPA.
public record PontoResponseDTO(
        UUID id,
        String nome,
        String endereco,
        String bairro,
        String horario,
        String tipo,
        Double latitude,
        Double longitude
) {
    // Converte a entidade para o formato que o app recebe.
    public static PontoResponseDTO from(Ponto ponto) {
        return new PontoResponseDTO(
                ponto.getId(), ponto.getNome(), ponto.getEndereco(), ponto.getBairro(),
                ponto.getHorario(), ponto.getTipo(), ponto.getLatitude(), ponto.getLongitude()
        );
    }
}
