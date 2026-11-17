package br.com.maoa.instituto.api.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ErroResponseDTO(LocalDateTime timestamp, int status, String erro, List<String> mensagens) {
}
