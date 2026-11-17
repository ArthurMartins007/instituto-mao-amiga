package br.com.maoa.instituto.api.config;

import br.com.maoa.instituto.api.dto.ErroResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class ApiExceptionHandler {
// deixa os erros de validação formatados
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponseDTO> tratarValidacao(MethodArgumentNotValidException ex) {
        List<String> mensagens = ex.getBindingResult().getFieldErrors()
                .stream().map(erro -> erro.getField() + ": " + erro.getDefaultMessage()).toList();
        return ResponseEntity.badRequest().body(
                new ErroResponseDTO(LocalDateTime.now(), 400, "Dados inválidos", mensagens)
        );
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErroResponseDTO> tratarStatus(ResponseStatusException ex) {
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
        String mensagem = ex.getReason() == null ? status.getReasonPhrase() : ex.getReason();
        return ResponseEntity.status(status).body(
                new ErroResponseDTO(LocalDateTime.now(), status.value(), mensagem, List.of(mensagem))
        );
    }
}
