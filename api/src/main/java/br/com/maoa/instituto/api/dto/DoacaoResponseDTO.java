package br.com.maoa.instituto.api.dto;

import br.com.maoa.instituto.api.entity.Doacao;
import java.time.LocalDateTime;
import java.util.UUID;

// Resposta da API com identificador e data original da doação.
public record DoacaoResponseDTO(
        UUID id,
        String tipoItem,
        Integer quantidade,
        String pontoDestino,
        LocalDateTime criadoEm
) {
    // Faz a conversão da entidade para o DTO de resposta.
    public static DoacaoResponseDTO from(Doacao doacao) {
        return new DoacaoResponseDTO(doacao.getId(), doacao.getTipoItem(), doacao.getQuantidade(),
                doacao.getPontoDestino(), doacao.getCriadoEm());
    }
}
