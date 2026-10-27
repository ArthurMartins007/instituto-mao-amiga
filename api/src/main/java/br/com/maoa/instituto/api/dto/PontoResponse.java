package br.com.maoa.instituto.api.dto;

import br.com.maoa.instituto.api.entity.Ponto;

public record PontoResponse(
        Long id,
        String nome,
        String endereco,
        String horario,
        String recebeDistribui,
        Double latitude,
        Double longitude
) {
    public static PontoResponse from(Ponto ponto) {
        return new PontoResponse(
                ponto.getId(),
                ponto.getNome(),
                ponto.getEndereco(),
                ponto.getHorario(),
                ponto.getRecebeDistribui(),
                ponto.getLatitude(),
                ponto.getLongitude()
        );
    }
}
