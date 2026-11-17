package br.com.maoa.instituto.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

// Dados que podem entrar no cadastro ou na edição de um ponto.
public record PontoRequestDTO(
        @NotBlank(message = "O nome é obrigatório.")
        String nome,
        @NotBlank(message = "O endereço é obrigatório.")
        String endereco,
        @NotBlank(message = "O bairro é obrigatório.")
        String bairro,
        @NotBlank(message = "O horário é obrigatório.")
        String horario,
        @NotBlank(message = "O tipo é obrigatório.")
        @Pattern(regexp = "(?i)coleta|distribuição", message = "O tipo deve ser coleta ou distribuição.")
        String tipo
) {
}
